module.exports = function(db, cb)
{
	db.define('reservation',
	{
		name : String,
		peopleNumber : Number,
		kind : String,
		date : { type: "date", time: true },
		validationStatus : ["validateByRestaurant", "cancelledByUser", "cancelledByRestaurant", "none"],
	},
	{
		autoFetch: true,
		hooks:
		{
			beforeCreate: function(next)
			{
				this.date = new Date();
				this.validationStatus = "none";
				next();
			}
		}
	});
}