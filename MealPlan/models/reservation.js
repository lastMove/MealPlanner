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