[module.exports = function(db, cb)
{
	  var Dish = db.define('dish', 
	  {
    		name : String,
    		description : String,
    		price : String
       });
}
]