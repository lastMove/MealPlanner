module.exports = function(db, cb)
{
	db.define('reservation',
	{
		name : String,
		peopleNumber : Number,
		kind : String,
		date : { type: "date", time: true }
	});
}