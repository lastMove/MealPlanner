
exports.indexPage = function(req, res, next)
{
	// 1 Restaurant Name
	req.Restaurant.getReservations(function(err, reservations)
	{
		if (error)
			next(newErr(err));
		res.render('mainPage', {
       			restaurant: req.restaurant,
        		reservations: reservations
    	});	
	});
}

exports.login = function(req, res, next)
{
	var userName = req.body.userName;
	var password = req.body.password;

	req.session.userName = userName;
	req.session.password = password;
	res.redirect('/webApp');
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
		if (order)
			res.render('reservation', {restaurant : req.restaurant, reservation : req.reservation, order : order});
	})
}

