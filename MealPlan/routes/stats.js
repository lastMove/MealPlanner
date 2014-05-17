var newErr = require('../error').newError;

exports.statsPage = function(req, res, next)
{
	res.render('stats');
}

topCustomers(req, res, next, topDishes)
{
	req.db.models.order.find({restaurant_id : req.restaurant.id}, function(err, orders)
	{
		if (err)
			res.render('error', {
				message: err.message,
				error: err
			});
		else
		{
			
		}
	});
}