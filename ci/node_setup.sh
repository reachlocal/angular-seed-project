#!/bin/bash

# Update nvm if node isn't installed
if ! hash node 2>/dev/null; then
    echo "Hmmm.  Looks like you don't have node installed.  FIXING!"
    wget -qO- https://raw.github.com/creationix/nvm/master/install.sh | sh;
    [[ -s $HOME/.nvm/nvm.sh ]] && . $HOME/.nvm/nvm.sh # This loads NVM

    # Set node version
    nvm install v0.10
    nvm alias default 0.10
    nvm use 0.10
fi

# Setup project
npm install --quiet