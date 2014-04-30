#!/bin/bash
./ci/gateway stop
./ci/gateway refresh
./ci/gateway start

. ./ci/node_setup.sh
./node_modules/.bin/gulp ci
