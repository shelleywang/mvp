var fs = require('fs'),
    moment = require('moment'),
    bingHelper = require('./utils/bingHelper.js');


var retrieveAnswers = function(query) {
  // calls out to StackOverflow API and retrieves data
  // TESTING: using dummy data

  var filepath = __dirname+'/../client/test/sample.json';
  var file = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(file).items;
};

var removeUnanswered = function(data) {
  var bestResults = data.filter(function (item) {
    return item.answer_count >=1; 
  })
  return bestResults;
};

var findHighestRepAnswer = function(question) {
  console.log(question.answers[0])
  return question.answers.reduce(function(prev,current) {
    if (current.owner.reputation > prev) return current.owner.reputation;
  },0);
};

var getStats = function(data) {
  var results = [];
  data.forEach(function(question) {
    var stats = {};
    stats.questionText = question.title;
    stats.tags = question.tags;
    stats.answered = question.is_answered;
    stats.views = question.view_count;
    stats.answerCount = question.answer_count;

    var unformattedDate = new Date(question.creation_date*1000);
    stats.normDate = unformattedDate;
    stats.postDate = moment(unformattedDate).fromNow();

    stats.link = question.link;
    stats.highestRep = findHighestRepAnswer(question);
    results.push(stats);
  });

  return results;
};


module.exports = {

  processSearch: function(req, res) {
    console.log(req.params.query); //gets the query text
    var answers = removeUnanswered(retrieveAnswers(req.query));
    res.status(200).send(getStats(answers));
  }

};