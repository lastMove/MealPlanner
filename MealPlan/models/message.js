module.exports = function(db, cb)
{
	  var Message = db.define('message', 
	  {
	  		text : String,
    		date : {type:"date", time:true}

       });
}
