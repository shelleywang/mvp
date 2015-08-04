var fs = require('fs');


var retrieveAnswers = function(query) {
  // calls out to StackOverflow API and retrieves data
  // TESTING: using dummy data

  var filepath = __dirname+'/../client/test/sample.json';
  var file = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(file).items;
}

var removeUnanswered = function(data) {
  var bestResults = data.filter(function (item) {
    return item.answer_count >=1; 
  })
  return bestResults;
}

var getStats = function(data) {
  var results = [];
  data.forEach(function(question) {
    var stats = {};
    stats.questionText = question.title;
    stats.tags = question.tags;
    stats.answered = question.is_answered;
    stats.views = question.view_count;
    stats.answerCount = question.answer_count;
    stats.postDate = question.creation_date;
    stats.link = question.link;
    results.push(stats);
  });

  return results;
}


module.exports = {

  processSearch: function(req, res) {
    var answers = removeUnanswered(retrieveAnswers(req.query));
    res.status(200).send(getStats(answers));
  }

};