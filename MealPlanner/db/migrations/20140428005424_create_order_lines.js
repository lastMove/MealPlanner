var CreateOrderLines = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('quantity', 'number');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('OrderLine', def, callback);
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
    this.dropTable('OrderLine', callback);
  };
};

exports.CreateOrderLines = CreateOrderLines;
