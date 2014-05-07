var newErr = require('../error').newError;
var orm = require('orm');

exports.indexPage = function(req, res, next)
{
	// 1 Restaurant Name
	req.restaurant.getReservations(function(err, reservations)
	{
		console.log(JSON.stringify(req.restaurant, undefined, 4));
		if (err)
			next(newErr(err));
		res.render('mainpage', {
       			restaurant: req.restaurant
    	});	
	});
}

exports.login = function(req, res, next)
{
	var userName = req.body.userName;
	var password = req.body.password;
	console.log("req.body");
	console.log(req.body);
	req.session.userName = userName;
	req.session.password = password;
	res.redirect('/webApp');
}

exports.logout = function(req, res, next)
{
	req.session.destroy(function(err)
	{
		res.redirect('/webApp/login')
	});
}

exports.signUp = function(req, res, next)
{
	var userName = req.body.userName;
	var password = req.body.password;
	var name = req.body.name;
	var password = req.body.password;
	var category = req.body.category;
	var description = req.body.description;
	var address = String;                                                                                                             
	req.db.models.restaurant.create(
	{
		userName : userName,
		password : password,
		name : name,
		category : category
	}, function(err, restaurant)
	{
		if (err)
			next(newErr(err));
		res.redirect('/webApp');
	});
}

exports.createDish = function(req, res, next)
{
	var name = req.body.name;
	var description = req.body.description;
	var price = req.body.price;

	req.db.models.dish.create(
	{
		name : name,
		description : description,
		price : price,
		restaurant_id : req.restaurant.id
	}, function(err, dish)
	{
		if (err)
			res.redirect('/webApp/dishes?result=failure');
		else
			res.redirect('/webApp/dishes?result=success');
	});
}

exports.deleteDish = function(req, res, next)
{
	var id = req.params.dish_id;

	req.db.models.dish.find({
		id : id
	}).remove(function(err, dish)
	{
		if (err)
			res.redirect('/webApp/dishes?modifResult=failureDelete');
		else
			res.redirect('/webApp/dishes?modifResult=successDelete');
	});
}

exports.updateDish = function(req, res, next)
{
	var name = req.body.name;
	var description = req.body.description;
	var price = req.body.price;
	var id = req.params.dish_id;

	req.db.models.dish.get(id, function(err, dish)
	{
		dish.save(
		{
			name : name,
			description : description,
			price : price
		}, function(err, dish)
		{
			if (err)
				res.redirect('/webApp/dishes?modifResult=failureUpdate');
			else
				res.redirect('/webApp/dishes?modifResult=successUpdate');
		})
	})
}

exports.updateDishPage = function(req, res, next)
{
	var id = req.params.dish_id;
	var dish = req.db.models.dish.get(id, function(err, dish)
	{
		res.render('updateDish', { dish: dish });
	});
}

exports.loginPage = function(req, res, next)
{
	res.render('login');
}

exports.signUpPage = function(req, res, next)
{
	res.render('register');
}
exports.dishesPage = function(req, res, next)
{
	req.db.models.dish.find({restaurant_id : req.restaurant.id}, function(err, dishes)
	{
		if (err)
			res.render('error', {
			message: err.message,
			error: err});
		else
			res.render('meals', {restaurant: req.restaurant, 
				dishes: dishes,
				result: req.query.result, 
				modifResult: req.query.modifResult});
	})
}

exports.optionsPage = function(req, res, next)
{
	req.db.models.openingDay.find({restaurant_id: req.restaurant.id}, function(err, openingDays)
	{
		if (err)
			res.render('error', {
			message: err.message,
			error: err
		});
		else
			{
				console.log(JSON.stringify(openingDays, undefined, 4));
				res.render('options', {restaurant: req.restaurant, 
					openingDays: openingDays,
					changePass: req.query.changePass,
					opDayAction: req.query.opDayAction,
					add: req.query.add});
			}		
	});
}

exports.reservationPage = function(req, res, next)
{
	if (req.reservation.order)
		req.db.models.orderLine.find({order_id: req.reservation.order.id}, function(err, orderline)
		{
			if (err)
				res.render('error', {
				message: err.message,
				error: err
			});
			else
				res.render('reservation', {reservation : req.reservation, orderline : orderline});
		});
	else
		res.render('reservation', {reservation : req.reservation, orderline : null});
}

exports.openingDayPage = function(req, res, next)
{
	var id = req.params.openingDay_id;

	req.db.models.openingDay.get(id, function(err, openingDay)
	{
		if (err)
			res.render('error', {
			message: err.message,
			error: err
			});
		else
			res.render('openingDay', {openingDay : openingDay});
	});
}

exports.changePassword = function(req, res, next)
{
	var oldPassword = req.body.oldPassword;
	var newPassword = req.body.newPassword;
	var reNewPasword = req.body.reNewPasword;

	if (req.restaurant.password == oldPassword && newPassword == reNewPasword)
	{
		req.db.models.restaurant.one({ userName : req.restaurant.userName}, function(err, restaurant){
			if (err)
				res.redirect('/webApp/options?changePass=failure');
			else
			{
				restaurant.password = newPassword;
				restaurant.save(function(err, restaurant){
					if (err)
						res.redirect('/webApp/options?changePass=failure');
					else
					{
						req.session.password = newPassword;
						req.restaurant = restaurant;
						res.redirect('/webApp/options?changePass=success');
					}
				});
			}
		});
	}
	else
		res.redirect('/webApp/options?changePass=failure');
}

exports.deleteOpeningDay = function(req, res, next)
{
	var id = req.params.openingDay_id;
	var restaurant_id = req.restaurant.id;

	req.db.models.openingDay.one({id:id, restaurant_id:restaurant_id}).remove(function(err){
		if (err)
			res.redirect('webApp/options?opDayAction=deleteFailure');
		else
		{
			console.log("restaurant id:" + restaurant_id + " delete openingDay id: " + id);
			res.redirect('/webApp/options?opDayAction=deleteSuccess');
		}
	});
}

exports.updateOpeningDay = function(req, res, next)
{
	var id = req.params.openingDay_id;
	var restaurant_id = req.restaurant.id;
	var dow = req.body.dow;
	var openTime = req.body.openTime;
	var closeTime = req.body.closeTime;

	if (dow || openTime || closeTime)
	{
		req.db.models.openingDay.one({id:id, restaurant_id:restaurant_id}, function(err, openingDay){
			if (err || !openingDay)
				res.redirect('/webApp/options?opDayAction=updateFailure');
			else
			{
				if (dow)
					openingDay.dow = dow;
				if (openTime)
					openingDay.openTime = openTime;
				if (closeTime)
					openingDay.closeTime = closeTime;
				openingDay.save(function(err, openingDay) {
					if (err)
						res.redirect('/webApp/options?opDayAction=updateFailure');
					else
					{
						console.log("update opening day id: " + id);
						res.redirect('/webApp/options?opDayAction=updateSuccess');
					}
				});
			}
		});
	}
	else
		res.redirect('/webApp/options?opDayAction=updateFailure');
}

exports.addOpeningDay = function(req, res, next)
{
	var restaurant_id = req.restaurant.id;
	var dow = req.body.dow;
	var openTime = req.body.openTime;
	var closeTime = req.body.closeTime;

	req.db.models.openingDay.create({
		dow : dow,
		openTime : openTime,
		closeTime : closeTime,
		restaurant_id : restaurant_id
	}, function(err, openingDay) {
		if (err || !openingDay)
			res.redirect('/webApp/options?add=failure');
		else
		{
			console.log("create openingDay id: " + openingDay.id);
			res.redirect('/webApp/options?add=success');
		}
	});
}