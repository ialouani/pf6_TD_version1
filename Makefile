all: exo_js__7.js
	node $<
clean:
	rm -f a.out *.o *.js~ Makefile~ *.txt
