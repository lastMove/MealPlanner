var assert = require('assert')
  , tests
  , Dish = geddy.model.Dish;

tests = {

  'after': function (next) {
    // cleanup DB
    Dish.remove({}, function (err, data) {
      if (err) { throw err; }
      next();
    });
  }

, 'simple test if the model saves without a error': function (next) {
    var dish = Dish.create({});
    dish.save(function (err, data) {
      assert.equal(err, null);
      next();
    });
  }

, 'test stub, replace with your own passing test': function () {
    assert.equal(true, false);
  }

};

module.exports = tests;
