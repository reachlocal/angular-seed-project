# config valid only for Capistrano 3.1
lock '3.1.0'

set :application, 'cpiclient'
set :deploy_to,   '/rl/product/cpiclient'
set :user,        'appuser'
set :rails_env,   'development'

set :ssh_options,
    user: 'appuser',
    forward_agent: true, # don't forget to ssh-add your keys so git-clone works
    compression: 'none'  # avoid 'stream was freed prematurely' errors

Rake::Task["deploy:check"].clear
Rake::Task["deploy:updating"].clear

namespace :deploy do
  task :check do
    on release_roles :all do
      execute :mkdir, '-pv', repo_path
      execute :echo, "'This deployment uses Nexus, a git checkout is not needed' > #{repo_path}/README"
    end
    invoke 'deploy:check:directories'
    invoke 'deploy:check:linked_dirs'
    invoke 'deploy:check:make_linked_dirs'
    invoke 'deploy:check:linked_files'
  end

  task :updating => :new_release_path do
    on release_roles :all do
      execute :mkdir, '-pv', release_path
    end
    invoke 'deploy:symlink:shared'
  end

  after :updated, :dist do
    on roles :web do

      require 'open-uri'
      require 'json'

      # If BUILD_NAME is not specified as CPIC-MASTER-JOB1-NNNN, attempt to deploy last green build
      if ENV['BUILD_NAME'] !~ /CPIC-MASTER-JOB1-\d+/
        open('http://releng-api.reachlocal.com/cpiclient_builds.json') do |json|
          info "BUILD_NAME environment variable is not set. Attempting to find last green build..."
          set :build_name, JSON.load(json).last['buildName']
        end
      else
        set :build_name, ENV['BUILD_NAME']
      end

      info "Build key is set to #{fetch :build_name}"

      # Download artifact from Nexus
      url = "http://releng-api.reachlocal.com/cpiclient_builds/#{fetch :build_name}.json"
      info "Fetching artifact information from '#{url}'..."

      open(url) do |json|
        artifact = JSON.load(json)['url']
        info "Fetching artifact from '#{artifact}'"
        execute <<-EOC
          rm -rf #{release_path}/dist
          curl -s "#{artifact}" | tar -C #{release_path} -zxvf -
          echo "#{fetch :build_name}" > #{release_path}/dist/version.txt
        EOC
      end

      # Symlink the config
      execute <<-EOC
        rm -rf #{release_path}/dist/config.js
        ln -s #{release_path}/dist/configs/#{fetch :stage}.js #{release_path}/dist/config.js
      EOC
    end
  end
end
