#!/bin/bash

if ! [ -f ../scripts/functions.sh ]; then
  echo -e "\033[31mCould not find \033[1m../scripts/functions.sh\033[0m\nCloning the \033[37mscripts\033[0m repository..."
  git clone -q ssh://git@stash.lax.reachlocal.com/cpi/scripts.git ../scripts
  if [ $? -ne 0 ]; then
    echo -e "\033[31mError when cloning the scripts repository. Please clone it manually and check the output.\033[0m"
    exit -1
  fi
fi

source ../scripts/functions.sh

check_for_keys_in_ssh_agent

check_env_variable OS_USERNAME
check_env_variable OS_PASSWORD
check_env_variable OS_TENANT_NAME
check_env_variable OS_AUTH_URL
check_env_variable OS_NO_CACHE
check_env_variable RLPC_SSH_PRIVATE_KEY

check_executable git '1.8.5'
check_executable ruby '2.1.0'
check_executable vagrant '1.4.3'

check_executable node 'v0.10.22'
check_executable npm '1.3.14'
check_executable bower '1.2.8'
check_executable gulp '3.5.2'

check_gem capistrano '3.1.0'
check_gem capistrano-rails '1.1.1'
check_gem capistrano-bundler '1.1.2'
check_gem capistrano-rvm '0.1.1'
check_gem capistrano3-unicorn '0.1.1'

install_node_packages
install_bower_packages

check_vagrant_plugin vagrant-vbguest '0.10.0'
check_vagrant_plugin vagrant-cachier '0.5.1'
check_vagrant_plugin vagrant-openstack-plugin '0.3.0'

ensure_pip
ensure_pbr
ensure_pip_package cinder
ensure_pip_package glance
ensure_pip_package heat
ensure_pip_package keystone
ensure_pip_package neutron
ensure_pip_package nova
ensure_pip_package swift

ensure_user_in_keystone
ensure_keypair_in_nova
ensure_latest_base_init

optional_command "Looks like the VM isn't running yet. Start it?" \
  '! vagrant status | grep default | grep -q "active (openstack)"' \
  'vagrant up --provider=openstack'

wait_for_provisioning 'www'

optional_command "Deploy latest master to VM using Capistrano?" \
  'true' \
  'cap rlpcdev deploy'

all_done
