ORDERED_TESTS = test/api.v1.js

test:	
	./node_modules/.bin/mocha $(ORDERED_TESTS) --reporter spec

.PHONY: test