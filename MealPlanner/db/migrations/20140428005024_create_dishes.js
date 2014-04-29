var CreateDishes = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('name', 'string');
          t.column('description', 'string');
          t.column('price', 'number');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('Dishes', def, callback);
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
    this.dropTable('Dishes', callback);
  };
};

exports.CreateDishes = CreateDishes;
