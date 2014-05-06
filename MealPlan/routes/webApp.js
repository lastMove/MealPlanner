var newErr = require('../error').newError;

exports.indexPage = function(req, res, next)
{
	// 1 Restaurant Name
	req.restaurant.getReservations(function(err, reservations)
	{
		console.log(JSON.stringify(req.restaurant));
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
	req.restaurant.getDishes(function(err, dishes)
	{
		if (err)
		{
			res.render('error', {err: error});
		}
	res.render('meals', {restaurant: req.restaurant, dishes: dishes});
	});
}

exports.optionsPage = function(req, res, next)
{
	res.render('options', {restaurant: req.restaurant});
}


exports.reservationPage = function(req, res, next)
{
	req.reservation.getOrder(function(err, order)
	{
		res.render('reservation', {restaurant : req.restaurant, reservation : req.reservation, order : order});
	})
}

