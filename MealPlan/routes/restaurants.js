var newErr = require('../error').newError;

exports.login = function(req, res, next)
{
	var userName = req.body.userName;
	var password = req.body.password;

	req.session.userName = userName;
	req.session.password = password;
	res.send("testHAHA");
}

exports.logout = function(req, res, next)
{
	req.session.destroy(function(err)
	{
		res.send("finish");
	});
}