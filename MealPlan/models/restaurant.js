module.exports = function(db, cb)
{
	  var Restaurant = db.define('restaurant', 
	  {
    		address : String,
    		description : String,
    		name : String,
    		userName : String,
    		password : String,
    		category : String
       });
}
