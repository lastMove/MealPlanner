var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var restaurant_id = req.restaurant.id;
	var userName = req.body.userName;
	var dishName = req.body.dishName;
	var description = req.body.description;
	var user_id;
	var dish_id;

	req.db.models.user.one({ userName : userName }, function(err, user) {
		if (err || !user)
			res.redirect('/webApp/coupons?create=failureUser');
		else
			user_id = user.id;
	});
	req.db.models.dish.one({ name : dishName }, function(err, dish) {
		if (err || !dish)
			res.redirect('/webApp/coupons?create=failureDish');
		else
			dish_id = dish.id;
	});

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
				res.redirect('/webApp/coupons?deleteCoupon=failure');
			else
			{
				console.log("restaurant_id id : " + restaurant_id + " delete coupon id: " + id);
				res.redirect('/webApp/coupons?deleteCoupon=success');
			}
		});
}

exports.couponPage = function(req, res, next)
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
				console.log(JSON.stringify(coupons));
				res.render('coupons', { coupons : coupons });
			}
	})
}