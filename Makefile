all: clean swf js

clean:
	@echo Cleaning up...
	@echo > dist/tmp
	@rm dist/*

swf:
	@echo Building swf...
	@cd src; haxe -swf9 ../dist/bhd.swf -swf-version 10 -main DownloadButton

js:
	@echo Building js...
	@cp src/bhd.js dist
	@cp lib/* dist
