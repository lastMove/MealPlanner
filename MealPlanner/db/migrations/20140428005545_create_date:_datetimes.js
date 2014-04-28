var CreateDate:Datetimes = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('text', 'String');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('date:Datetime', def, callback);
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
    this.dropTable('date:Datetime', callback);
  };
};

exports.CreateDate:Datetimes = CreateDate:Datetimes;
