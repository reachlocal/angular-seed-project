# TESTS!
Please follow the pyramid model of testing:

* Lots of unit tests (use mocks)
* Some integration tests (no mocks)
* A few acceptance (cucumber) tests

There are some examples of unit and integration tests in here already.  There are also
some helpers defined in the `helpers/` directory.  (These are auto-loaded for all test runs.)

If you need to setup cucumber tests, please take a look at the `cpi-client` project in stash
for some examples.
