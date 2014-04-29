var CreateRestaurants = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'String');
          t.column('totalSeats', 'string');
          t.column('adress', 'String');
          t.column('description', 'String');
          t.column('lont', 'number');
          t.column('lat', 'number');
          t.column('style', 'String');
          t.column('foodType', 'String');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('Restaurants', def, callback);
  };

  this.down = function (next) {
    var callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.dropTable('Restaurants', callback);
  };
};

exports.CreateRestaurants = CreateRestaurants;
