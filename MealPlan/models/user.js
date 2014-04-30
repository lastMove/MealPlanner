var orm = require('orm');
module.exports = function(db, cb)
{
  var User = db.define('user', {
    userName : String,
    password : String,
    mail : String,
    subscriptionDate : Date,
    resetPasswordToken : String,
    resetPasswordExpires :  Date
  },
  {
   validations:
   {
    userName : [orm.enforce.required(), orm.enforce.unique({ ignoreCase: true },   "userName already used"), orm.enforce.ranges.length(3, undefined, "userName too short")], 
    mail : [orm.enforce.patterns.email(), orm.enforce.unique({ignoreCase:true})],
    subscriptionDate :   orm.enforce.required(),
  },
  hooks: 
    {
      beforeCreate: function (next) 
      {
         this.subscriptionDate = new Date();
        next();
      }
    }
  });
}
