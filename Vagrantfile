# -*- mode: ruby -*-
# vi: set ft=ruby :

# First, a quick environment check:
def check!(var, default=nil)
  return unless ENV[var].nil? || ENV[var].empty?
  if default
    puts "WARNING: #{var} environment variable not set. Defaulting to '#{default}'."
    ENV[var] = default
  else
    puts "ERROR: #{var} environment variable not set"
    exit -1
  end
end

check! 'OS_USERNAME'
check! 'OS_PASSWORD'
check! 'OS_TENANT_NAME', 'CPI'
check! 'OS_AUTH_URL', 'http://rlpc-control.dev.wh.reachlocal.com:5000/v2.0/'
check! 'OS_NO_CACHE', '1'
check! 'RLPC_SSH_PRIVATE_KEY', '~/.ssh/id_rsa'

unless File.exists? './tmp/base_init.txt'
  puts <<-EOM
ERROR: Could not find ./tmp/base_init.txt. Please grab it from:

  https://stash.lax.reachlocal.com/projects/RLPC/repos/base_init/browse/base_init.txt?at=HEAD&raw

Alternatively, you can run mac-setup.sh and it should set everything up for you.
EOM
  exit -1
end

Vagrant.configure '2' do |config|

  config.vm.box = 'dummy'
  config.vm.box_url = 'https://github.com/cloudbau/vagrant-openstack-plugin/raw/master/dummy.box'

  config.ssh.private_key_path = ENV['RLPC_SSH_PRIVATE_KEY']

  # The default synced folder is disabled, because the only way the
  # openstack provider has to simulate a synced folder is through
  # rsync... and that's kinda useless for day-to-day development
  config.vm.synced_folder '.', '/vagrant', disabled: true

  config.vm.provider :openstack do |os|
    os.api_key      = ENV['OS_PASSWORD']
    os.username     = ENV['OS_USERNAME']
    os.tenant       = ENV['OS_TENANT_NAME']
    os.ssh_username = ENV['OS_USERNAME']
    os.network      = 'DEV_APP'
    os.keypair_name = ENV['OS_USERNAME']
    os.server_name  = "www.#{ENV['OS_USERNAME']}.cpi.dev.wh.reachlocal.com"
    os.endpoint     = "#{ENV['OS_AUTH_URL']}tokens"
    os.image        = '0611d777-a8d6-4298-b807-f626d614de81'
    os.flavor       = 'm1.small'
    os.metadata     = {
      puppetEnv:     'cpi',
      puppetClasses: 'apps_cpi_client',
      puppetVars:    'platform=usa|sub=app|service=cpi_client',
    }
    os.user_data = File.read('./tmp/base_init.txt')
  end

  unless Vagrant.has_plugin? 'vagrant-openstack-plugin'
    raise "Please install the vagrant OpenStack plugin with 'vagrant plugin install vagrant-openstack-plugin'"
  end

end
