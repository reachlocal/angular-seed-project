# Deploys to www.<username>.cpi.dev.wh.reachlocal.com,
# a previously-started RLPC instance

fail 'OS_USERNAME is not set' unless ENV['OS_USERNAME']

set :deploy_to,        '/rl/product/cpi_client'
set :user,             'appuser'
set :rails_env,        'development'

set :ssh_options,
    user: 'appuser',
    forward_agent: true, # don't forget to ssh-add your keys so git-clone works
    compression: 'none'  # avoid 'stream was freed prematurely' errors

server "www.#{ENV['OS_USERNAME']}.cpi.dev.wh.reachlocal.com", roles: [:web]

namespace :deploy do
  after :updated, :dist do
    on roles :web do
      # Temporary hack to change the config; this will be removed when config
      # is revisited in cpi-client
      execute %[sed -i 's/gatewayBaseUrl: "http:\\/\\/localhost:8001"/gatewayBaseUrl: "http:\\/\\/gateway.#{ENV['OS_USERNAME']}.cpi.dev.wh.reachlocal.com"/' #{release_path}/app/modules/main/config.js]

      # Installs NVM and uses Node 0.10
      execute <<-EOC
        cd #{release_path}
        wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh
      EOC

      execute <<-EOC
        cd #{release_path}
        source $HOME/.nvm/nvm.sh
        nvm install v0.10
        nvm alias default 0.10
        nvm use 0.10
        npm install --quiet
        ./node_modules/.bin/gulp dist
      EOC
    end
  end
end
