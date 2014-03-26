bin = node_modules/.bin/gulp
files=$(filter-out Makefile,$(wildcard *))
install:; @npm install
$(files) %:;@$(bin) $@
.PHONY: install $(files)
