module.exports = function(db, cb)
{
	db.define('orderLine',
	{
		quantity  : Number
	});
}