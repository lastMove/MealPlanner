var newErr = require('../error').newError;



exports.logout = function(req, res, next)
{
	req.session.destroy(function(err)
	{
		res.send("finish");
	});
}

exports.addOpeningDay = function(req, res, next)
{
	var dow = req.body.dow;
	var openTime = req.body.openTime;
	var closeTime = req.body.closeTime;

	if (!dow || !openTime || !closeTime)
		console.log("something is missing ('closetime', 'openTime' or 'dow'");
	req.db.models.openingDay.create(
	{
		dow : dow,
		openTime : openTime,
		closeTime : closeTime,
		restaurant_id : restaurant.id
	}, function(err, openingDays)
	{
		if (!err)
			next(newErr(500, err));
		res.redirect('/TOCOMPLETE');
	});
}

exports.removeOpeningDayById = function(req, res, next)
{
	var id = req.body.id;
	
	req.db.models.openingDay.find({restaurant_id : restaurant.id, id : id}).remove(function(err){
		if (err)
			next(newErr(500, err));
		res.redirect('/TOCOMPLETE');
	});
}

exports.removeOpeningDayByDOW = function(req, res, next)
{
	var dow = req.body.dow;

	req.db.models.openingDay.find({restaurant_id : restaurant.id, dow : dow}).remove(function(err){
		if (err)
			next(newErr(500, err));
		res.redirect('/TOCOMPLETE');
	});
}

exports.getRestaurants = function(req, res, next)
{
	req.db.models.restaurant.find({}, function(err, restaurants)
	{
		if (err)
			res.send(err);
		res.send(restaurants);
	});
}

exports.getOneRestaurant = function(req, res, next)
{
	req.db.models.restaurant.find({id : req.params.restaurant_id}, function(err, restaurants)
	{
		if (err)
			res.send(err);
		res.send(restaurants);
	});
}

exports.restaurantsByCategory = function(req, res, next)
{
	var category = req.params.category;
req.db.models.restaurant.find({category: category}, function(err, restaurants)
	{
		if (err)
			res.send(err);
		res.send(restaurants);
	});
}