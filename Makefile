TESTS = test/node.js
REPORTER = dot

browser: node_modules lib/* components
	@./node_modules/.bin/component-build -s fload -o .
	@mv build.js fload.js

components: node_modules component.json
	@./node_modules/.bin/component-install --dev

build: components lib/*
	@./node_modules/.bin/component-build --dev

test: test-node test-browser

test-node:
	@NODE_ENV=test ./node_modules/.bin/mocha \
		--require test/support/bootstrap \
		--reporter $(REPORTER) \
		$(TESTS)

test-browser: build
	@./node_modules/karma/bin/karma start \
		--single-run --browsers PhantomJS,Chrome,Firefox

test-travisci:
	@echo TRAVIS_JOB_ID $(TRAVIS_JOB_ID)
	@make test-node

coverage:
	@./node_modules/.bin/istanbul cover ./node_modules/.bin/_mocha $(TESTS) \
		-- --require test/support/bootstrap

coveralls:
	@./node_modules/.bin/istanbul cover \
		./node_modules/.bin/_mocha --report lcovonly\
		-- --require test/support/bootstrap \
		$(TESTS) \
		&& cat ./coverage/lcov.info | ./node_modules/coveralls/bin/coveralls.js

.PHONY: all test coverage
