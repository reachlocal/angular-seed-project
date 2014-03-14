# Deploys to www.<username>.cpi.dev.wh.reachlocal.com,
# a previously-started RLPC instance

fail 'OS_USERNAME is not set' unless ENV['OS_USERNAME']

server "www.#{ENV['OS_USERNAME']}.cpi.dev.wh.reachlocal.com", roles: [:web]
