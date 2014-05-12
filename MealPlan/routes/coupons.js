var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var restaurant_id = req.restaurant.id;
	var user_id = req.body.user_id;
	var dish_id = req.body.dish_id;
	var description = req.body.description;

	req.db.models.coupon.create({
		restaurant_id	: restaurant_id,
		user_id			: user_id,
		dish_id			: dish_id,
		description		: description  
	}, function(err, coupon) {
		if (err || !coupon)
			res.redirect('/webApp/coupons?create=failure');
		else
		{
			console.log("Coupon create with id: " + coupon.id);
			res.redirect('/webApp/coupons?create=success');
		}
	});
}

exports.delete = function(req, res, next)
{
	var id = req.params.coupon_id;
	var restaurant_id = req.restaurant.id;

	req.db.models.coupon.find(
		{ 
			id : id,
			restaurant_id : restaurant_id
		}).remove(function(err) {
			if (err)
				res.redirect('/webApp/coupons?delete=failure');
			else
			{
				console.log("restaurant_id id : " + restaurant_id + " delete coupon id: " + id);
				res.redirect('/webApp/coupons?delete=success');
			}
		});
}

exports.readForRestaurant = function(req, res, next)
{
	var restaurant_id = req.restaurant.id;

	req.db.models.coupon.find(
		{
			restaurant_id : restaurant_id
		}, function(err, coupons) {
			if (err || ! coupons)
				next(newErr(500, "coupons not found"));
			else
			{
				console.log("read coupons with restaurant_id: " + restaurant_id);
				res.send(coupons);
			}
	})
}