module.exports = function(db, cb)
{
	db.define('reservation',
	{
		name : String,
		peopleNumber : Number,
		kind : String,
		creationDate : { type: "date", time: true },
		reservationDate : {type : "date", time: true},
		validationStatus : ["validateByRestaurant", "cancelledByUser", "cancelledByRestaurant", "none"],
	},
	{
		hooks:
		{
			beforeCreate: function(next)
			{
				this.date = new Date();
				this.validationStatus = "none";
				this.creationDate = new Date();
				next();
			}
		}
	});
}