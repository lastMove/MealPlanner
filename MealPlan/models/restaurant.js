module.exports = function(db, cb)
{
	  var Restaurant = db.define('restaurant', 
	  {
    		address : String,
    		postalCode : String,
    		city : String,
    		description : String,
    		name : String,
    		userName : String,
    		password : String,
    		category : String,
            mail : String
       });
}
