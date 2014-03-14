# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'cpi_client'
set :repo_url, 'ssh://git@stash.lax.reachlocal.com/cpi/cpi-client.git'
set :deploy_to,        '/rl/product/cpi_client'
set :user,             'appuser'
set :rails_env,        'development'

set :ssh_options,
    user: 'appuser',
    forward_agent: true, # don't forget to ssh-add your keys so git-clone works
    compression: 'none'  # avoid 'stream was freed prematurely' errors

namespace :deploy do
  after :updated, :dist do
    on roles :web do
      # Install NVM, node_modules, and run gulp task for deployment
      execute <<-EOC
        cd #{release_path}
        ./ci/deploy.sh
      EOC

      # Symlink the config
      execute <<-EOC
        rm #{release_path}/dist/config.js
        ln -s /rl/data/shared/configs/cpi_client_config.js #{release_path}/dist/config.js
      EOC
    end
  end
end
