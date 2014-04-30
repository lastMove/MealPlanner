module.exports = function(db, cb)
{
	db.define('meeting',
	{
		startDate : {type:"date", time:true},
		endDate : {type:"date", time:true},

		address : String
	});
}