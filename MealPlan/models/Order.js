module.exports = function(db, cb)
{
	db.define('order', 
	{
		date : {type:"date", time:true}
	});
}