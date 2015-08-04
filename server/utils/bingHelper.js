var config = require('./config.js'),
    Bing = require('node-bing-api')({ accKey: config.API_KEY });

var retrieveBing = function(query) {
  // TEMPORARY
  // used to populate dummy data file sample3.json
  Bing.web(query+ ' site:stackoverflow.com', {
    top: 20
  }, function(error, res, body) {
    console.log(res,JSON.stringify(body));
    var filepath = __dirname+'/../client/test/sample3.json';
    fs.writeFileSync(filepath, JSON.stringify(body));
  })
};

var getResults = function(query) {
  // var data = retrieveBing(query); 

  // temporary using dummy data 
  var filepath = __dirname+'/../client/test/sample3.json';
  var file = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(file).items;

  // TODO: parse json results for stackoverflow question IDs
};

module.exports = {
  getResults: getResults
};