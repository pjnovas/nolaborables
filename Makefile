ORDERED_TESTS = test/api.v1.js

test:	
	node app.js & 
	sleep 0.1
	./node_modules/.bin/mocha $(ORDERED_TESTS) --reporter spec
	sleep 0.1

.PHONY: test