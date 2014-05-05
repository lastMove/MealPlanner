module.exports = function(db, cb)
{
	db.define('openingDay',
	{
		dow : String,
		openTime : String,
		closeTime : String
	});
}