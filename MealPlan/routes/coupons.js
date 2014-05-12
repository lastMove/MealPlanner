var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var restaurant_id = req.restaurant.id;
	var userName = req.body.userName;
	var dishName = req.body.dishName;
	var description = req.body.description;

	req.db.models.user.one({ userName : userName }, function(err, user) {
		if (err || !user)
			res.redirect('/webApp/coupon?create=failureUser');
		else
		{
			req.db.models.dish.one({ name : dishName }, function(err, dish) {
			if (err || !dish)
				res.redirect('/webApp/coupon?create=failureDish');
			else
				req.db.models.coupon.create({
				restaurant_id	: restaurant_id,
				user_id			: user.id,
				dish_id			: dish.id,
				description		: description  
				}, function(err, coupon) {
					if (err || !coupon)
						res.redirect('/webApp/coupon?create=failure');
					else
				{
					console.log("Coupon create with id: " + coupon.id);
					res.redirect('/webApp/coupon?create=success');
				}
				});
			});
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
				res.redirect('/webApp/coupon?deleteCoupon=failure');
			else
			{
				console.log("restaurant_id id : " + restaurant_id + " delete coupon id: " + id);
				res.redirect('/webApp/coupon?deleteCoupon=success');
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
				console.log(JSON.stringify(coupons, undefined, 4));
				res.render('coupon', { coupons : coupons,
				restaurantName : req.restaurant.name,
				deleteCoupon : req.query.deleteCoupon,
				create : req.query.create });
			}
	})
}