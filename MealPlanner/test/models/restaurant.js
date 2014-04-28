var assert = require('assert')
  , tests
  , Restaurant = geddy.model.Restaurant;

tests = {

  'after': function (next) {
    // cleanup DB
    Restaurant.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var restaurant = Restaurant.create({});
    restaurant.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
