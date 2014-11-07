var fs = require('fs');
var _localised = {};

function readLines(input, func) {
var remaining = '';

input.on('data', function(data) {
  remaining += data;
  var index = remaining.indexOf('\n');
  while (index > -1) {
    var line = remaining.substring(0, index);
    remaining = remaining.substring(index + 1);
    func(line);
    index = remaining.indexOf('\n');
  }
});

input.on('end', function() {
  var json = JSON.stringify(_localised, null, 4);
  // fs.writeFile("en.json", json); 
  console.log(json);
  console.log("wrote to en.json");
  if (remaining.length > 0) {
    console.log();
    func(remaining);
  }
});
}



function func(data) {
  if(data !== "" && data !== "\n" && data !== "\t" ) {
    _localised[data] = data;
  }
  
  
}

var input = fs.createReadStream('content.txt');
readLines(input, func);