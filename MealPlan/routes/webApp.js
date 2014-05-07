var newErr = require('../error').newError;

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
	res.render('meals', {restaurant: req.restaurant, result: req.query.result, modifResult: req.query.modifResult});
}

exports.optionsPage = function(req, res, next)
{
	console.log(JSON.stringify(req.restaurant, undefined, 4));
	res.render('options', {restaurant: req.restaurant});
}

exports.reservationPage = function(req, res, next)
{
	res.render('reservation', {reservation : req.reservation});
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
				res.redirect('/webApp/option?changePass=failure');
			else
			{
				restaurant.password = newPassword;
				restaurant.save(function(err, restaurant){
					if (err)
						res.redirect('/webApp/option?changePass=failure');
					else
					{
						req.restaurant = restaurant;
						res.redirect('/webApp/option?changePass=succes');
					}
				});
			}
		});
	}
	else
		res.redirect('/webApp/option?changePass=failure');
}

exports.delete = function(req, res, next)
{
	var id = req.params.openingDay_id;
	var restaurant_id = req.restaurant.id;

	req.db.models.openingDay.one({id:id, restaurant_id:restaurant_id}).remove(function(err){
		if (err)
			res.redirect('webApp/openingDay?delete=failure');
		else
		{
			console.log("restaurant id:" + restaurant_id + " delete openingDay id: " + id);
			res.redirect('/webApp/openingDay?delete?success');
		}
	});
	res.redirect('webApp/openingDay?delete=failure');
}

exports.updateOpeningDay = function(req, res, next)
{
	var id = req.params.openingDay_id,
	restaurant_id = req.restaurant.id,
	dow = req.body.dow,
	openTime = req.body.openTime,
	closeTime = req.body.closeTime;

	if (dow || openTime || closeTime)
	{
		req.db.models.openingDay.one({id:id, restaurant_id:restaurant_id}, function(err, openingDay){
			if (err || !openingDay)
				res.redirect('/webApp/openingDay?update=failure');
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
						res.redirect('/webApp/openingDay?update=failure');
					else
					{
						console.log("update opening day id: " + id);
						res.redirect('/webApp/openingDay?update=success');
					}
				});
			}
		});
	}
	res.redirect('/webApp/openingDay?update=failure');
}