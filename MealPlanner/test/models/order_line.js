var assert = require('assert')
  , tests
  , OrderLine = geddy.model.OrderLine;

tests = {

  'after': function (next) {
    // cleanup DB
    OrderLine.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var orderline = OrderLine.create({});
    orderline.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
