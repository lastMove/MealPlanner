var orm = require('orm');
var moment = require('moment');

module.exports = function(db, cb)
{
	db.define('order', 
	{
		date : {type:"date", time:true},
		status : Boolean
	},
	{
		hooks : {
			beforeSave : function(next) {
				if (moment(this.date).isValid() == false) {
					return next(new Error("date not valid"));
				}
				return next();
			}
		}
	});
}