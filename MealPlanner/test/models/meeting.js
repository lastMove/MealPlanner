var assert = require('assert')
  , tests
  , Meeting = geddy.model.Meeting;

tests = {

  'after': function (next) {
    // cleanup DB
    Meeting.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var meeting = Meeting.create({});
    meeting.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
