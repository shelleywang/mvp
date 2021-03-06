var fs = require('fs'),
    config = require('./config.js'),
    Bing = require('node-bing-api')({ accKey: config.BING_API_KEY });

/*
 * Uses Bing API to retrieve a list of 20 results from a search query
 */
var retrieveBing = function(query, callback) {
  // TEMPORARY
  // used to populate dummy data file sample3.json
  Bing.web(query+ ' site:stackoverflow.com', {
    top: 20
  }, function(error, res, body) {
    // console.log(res,JSON.stringify(body));
    // var filepath = __dirname+'/../client/test/sample3.json';
    // fs.writeFileSync(filepath, JSON.stringify(body));
    if (callback) callback(body.d);
  })
};

/*
 * Parses the results from the Bing API for a list of StackOverflow Question IDs
 */
var getResults = function(query, callback) {
  // temporary using dummy data 
  // var filepath = __dirname+'/../../client/test/sample3.json';
  // var file = fs.readFileSync(filepath, 'utf8');
  // var data = JSON.parse(file).d;
  // end temp 

  retrieveBing(query, function(data) {
    var valid = data.results.filter(function(result) {
      return result.Url.slice(0,35) === 'http://stackoverflow.com/questions/' &&
             result.Url.slice(0,41) !== 'http://stackoverflow.com/questions/tagged';
    });
    var ids = valid.map(function(validResult) {
      return +validResult.Url.split('/')[4];
    });
    callback(ids);
  }); 


};


module.exports = {
  getResults: getResults
};