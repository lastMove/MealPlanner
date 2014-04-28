var CreateMeetings = function () {
  this.up = function (next) {
    var def = function (t) {
          t.column('startDate', 'Datetime');
          t.column('endDate', 'datetime');
          t.column('adress', 'String');
        }
      , callback = function (err, data) {
          if (err) {
            throw err;
          }
          else {
            next();
          }
        };
    this.createTable('meetings', def, callback);
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
    this.dropTable('meetings', callback);
  };
};

exports.CreateMeetings = CreateMeetings;
