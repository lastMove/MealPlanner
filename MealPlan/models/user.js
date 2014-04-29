
module.exports = function(db, cb)
{
  var User = db.define('user', {
    userName : String,
    password : String,
    mail : String,
    mark : Number,
    subscriptionDate : Date,
    resetPasswordToken : String,
    resetPasswordExpires :  Date,
  },
  {
   validations:
   {
    userName : [orm.enforce.required(error.errorStr(error.missingRequiredField, "userName missing")), orm.enforce.unique({ ignoreCase: true },  error.errorStr(error.usernameAlreadyUsed, "userName already used")), orm.enforce.ranges.length(3, undefined, error.errorStr(error.usernameTooShort, "userName too short"))], 
    mail : [orm.enforce.patterns.email(error.errorStr(error.emailNotValid, "email not valid")), orm.enforce.unique({ignoreCase:true}, error.errorStr(error.emailAlreadyUsed, "email already used"))],
    subscriptionDate :   orm.enforce.required(),
    lastAction :  orm.enforce.required()
  },
  hooks: 
    {
      beforeCreate: function (next) 
      {
      this.subscriptionDate = new Date();
      this.mark = 0;
      }
    }
  });
}
