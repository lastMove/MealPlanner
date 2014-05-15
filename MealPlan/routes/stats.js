var newErr = require('../error').newError;

exports.statsPage = function(req, res, next)
{
	res.render('stats');
}