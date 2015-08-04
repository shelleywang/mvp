var fs = require('fs'),
    config = require('./config.js'),
    stackexchange = require('stackexchange');

var options = { version: 2.2 };
var context = new stackexchange(options);

var filter = {
  filter: '!frpXPuDBQ0W8sj4gZPV7mmVHloK9gkuxoBH',
  site: 'stackoverflow',
  // key: config.STACKEXCHANGE_API_KEY,
  // pagesize: 50,
  // tagged: 'node.js',
  // sort: 'activity',
  // order: 'asc'
};

// temp testing using a sample list of question IDs
var test = function(ids) {
  var tempIds = [ 13736690,
  16620665,8797834,23037439,26019823,24312243,28344007,31485561,
  27130412,11764539,28998093,28798313,31106668,30294085,28494506,
  31213164,9143757,29223278,15299206,9696843 ];

  context.questions.questions(filter, function(err, results){
    if (err) throw err;
    var filepath = __dirname+'/../../client/test/sample4.json';
    fs.writeFileSync(filepath, JSON.stringify(results));

    console.log(results.items);
    console.log(results.has_more);
  }, tempIds);
};

/* 
 * Uses StackExchange api to get Stackoverflow question information
 * Given a list of question IDs
 */
var retrieveAnswers = function(ids, callback) {
  // calls out to StackOverflow API and retrieves data
  // TESTING: using dummy data

  // var filepath = __dirname+'/../../client/test/sample4.json';
  // var file = fs.readFileSync(filepath, 'utf8');
  // return JSON.parse(file).items;
};

/*
 * Given a list of Stackoverflow question IDs, return processed results object
 */
var getResults = function(ids, callback) {
  console.log(ids);
  context.questions.questions(filter, function(err, results){
    if (err) throw err;

    // console.log(results.items);
    // console.log(results.has_more);

    var bestResults = results.items.filter(function (item) {
      return item.answer_count >=1; 
    })

    callback(bestResults);
  }, ids);
};


module.exports = {
  getResults: getResults,
};