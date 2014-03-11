#!/bin/bash
. ./ci/node_setup.sh
./node_modules/.bin/gulp dist
tar -zcvf dist.tar.gz dist/*
