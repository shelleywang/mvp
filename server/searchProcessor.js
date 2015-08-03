var fs = require('fs');


var retrieveAnswers = function(query) {
  // calls out to StackOverflow API and retrieves data
  // TESTING: using dummy data

  var filepath = __dirname+'/../client/test/sample.json';
  var file = fs.readFileSync(filepath, 'utf8');
  return JSON.parse(file);
}

var getStats = function(fulldata) {
  var results = [];
  var data= fulldata.items;
  data.forEach(function(question) {
    var stats = {};
    stats.questionText = question.title;
    stats.tags = question.tags;
    stats.answered = question.is_answered;
    stats.views = question.view_count;
    stats.answerCount = question.answer_count;
    stats.postDate = question.creation_date;
    results.push(stats);
  });

  return results;
}


module.exports = {

  processSearch: function(req, res) {
    var answers = retrieveAnswers(req.query);
    console.log(getStats(answers));
    res.status(200).send('Hello World');
  }

};