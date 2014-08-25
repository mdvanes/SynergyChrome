/* jshint globalstrict:true */
/* globals require, process, console */
// TODO break on error (testable with invalid path)
// TODO convert this util to a grunt plugin
'use strict';

var fs = require('fs');

function urlencodeFile(inputPath, outputPath) {

	console.log('urlencoding from ' + inputPath + ' to ' + outputPath);

	fs.readFile(inputPath, 'utf8', function(err, data) {
		//var source = 'alert(window.location=" ")';
		if (err) {
    		return console.log(err);
  		}
		var source = data;
		var encoded = encodeURI(source);
		//console.log(encoded);

		fs.writeFile(outputPath, encoded, function (err) {
		  	if (err) {
		  		return console.log(err);	
		  	}
		  	// Log success
		  	//console.log('Hello World > helloworld.txt');
		});
	});
}

if(process.argv.length !== 4) { // 4, because node.exe and encode.js are counted
	console.error('invalid amount of arguments');
}
urlencodeFile(process.argv[2], process.argv[3]);