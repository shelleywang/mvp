var fs = require('fs'),
    _ = require('underscore'),
    moment = require('moment'),
    bingHelper = require('./utils/bingHelper.js'),
    stackHelper = require('./utils/stackHelper.js');


var findHighestRepAnswer = function(question) {
  return question.answers.reduce(function(prev,current) {
    return (current.owner.reputation > prev) ? current.owner.reputation: prev;
  },0);
};

var decodeHtmlEntity = function(str) {
  return str.replace(/&#(\d+);/g, function(match, dec) {
    return String.fromCharCode(dec);
  });
};

var getStats = function(data) {
  var results = [];
  data.forEach(function(question) {
    var stats = {};
    stats.body = question.body.slice(0,400)+'...';
    stats.questionText = _.unescape(decodeHtmlEntity(question.title));
    stats.link = question.link;
    stats.tags = question.tags;
    stats.answered = question.is_answered;
    stats.views = question.view_count;
    stats.answerCount = question.answer_count;

    var unformattedDate = new Date(question.creation_date*1000);
    stats.normDate = unformattedDate;
    stats.postDate = moment(unformattedDate).fromNow();

    stats.highestRep = findHighestRepAnswer(question);

    results.push(stats);
  });

  return results;
};


module.exports = {

  processSearch: function(req, res) {
    var response = '';
    if (req.params.query.length > 0) {
      bingHelper.getResults(req.params.query, function(ids) {
        // console.log(ids);
        stackHelper.getResults(ids, function(bestResults) {
          console.log(bestResults)
          response = getStats(bestResults);
          res.status(200).send(response);
        });
        // // stackHelper.test();
      });

    } else {
      res.status(200).send(response);
    }
  }

};