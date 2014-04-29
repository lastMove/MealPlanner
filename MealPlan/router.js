var newErr = require('./error').newError;
exports.myRouter = function(app)
{
	app.get('/', function(req, res)
		{
		//	res.send("Wesh");
			throw newErr(409, "hahaha");
			res.send("Wesh");
		});
}