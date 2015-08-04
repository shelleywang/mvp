var fs = require('fs'),
    config = require('./config.js'),
    Bing = require('node-bing-api')({ accKey: config.BING_API_KEY });

/*
 * Uses Bing API to retrieve a list of 20 results from a search query
 */
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

/*
 * Parses the results from the Bing API for a list of StackOverflow Question IDs
 */
var getResults = function(query) {
  // var data = retrieveBing(query); 

  // temporary using dummy data 
  var filepath = __dirname+'/../../client/test/sample3.json';
  var file = fs.readFileSync(filepath, 'utf8');
  var data = JSON.parse(file).d;
  // end temp 

  var valid = data.results.filter(function(result) {
    return result.Url.slice(0,35) === 'http://stackoverflow.com/questions/';
  });
  var ids = valid.map(function(validResult) {
    return +validResult.Url.split('/')[4];
  });
  return ids;
};


module.exports = {
  getResults: getResults
};