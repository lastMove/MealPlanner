var newErr = require('./error').newError;
var users = require('./routes/users');
var meetings = require('./routes/meetings');
var messages = require('./routes/messages');
var restaurants = require('./routes/restaurants');
var orders = require('./routes/orders');
var order_lines = require('./routes/order_lines');
var reservations = require('./routes/reservations');
var webapp = require('./routes/webApp');

exports.myRouter = function(app)
{
	app.get('/', function(req, res)
		{
		//	res.send("Wesh");
			throw newErr(409, "hahaha");
			res.send("Wesh");
		});

	// WEBAPP
	app.get('/webApp', authAndLoadRestaurant, webapp.indexPage);
	app.get('/webApp/signup', webapp.signUpPage);
	app.get('/webApp/login', webapp.loginPage);
	app.get('/webApp/dishes', authAndLoadRestaurant, webapp.dishesPage);
	app.get('/webApp/options', authAndLoadRestaurant, webapp.optionsPage);
	app.post('/wenApp/login', webapp.login);
	// USERS
	app.get('/auth', authAndLoadUser, users.auth);
	app.post('/users/create', users.createUser);
	app.delete('/users/delete', authAndLoadUser, users.delete);
	app.get('/users/read', authAndLoadUser, users.list);
	app.put('/users/update', authAndLoadUser, users.update);
	app.get('/users/friends/read', authAndLoadUser, users.friendsList);
	app.put('/users/friends/add/:friend_id', authAndLoadUser, users.addFriend);
	app.put('/users/friends/remove/:friend_id', authAndLoadUser, users.removeFriend);
	
	// MEETINGS
	app.get('/meetings/read', authAndLoadUser, meetings.readByUser);
	app.post('/meetings/create', authAndLoadUser, meetings.create);
	app.put('/meetings/:meeting_id/update', authAndLoadUser, loadMeeting,  meetings.update);
	app.get('/meetings/:meeting_id/read', authAndLoadUser, loadMeeting, meetings.readOne);
	app.delete('/meetings/:meeting_id/delete', authAndLoadUser, loadMeeting, meetings.delete);
	app.get('/meetings/:meeting_id/members/read', authAndLoadUser, loadMeeting, meetings.listMembers);
	app.put('/meetings/:meeting_id/members/add/:user_id', authAndLoadUser, loadMeeting, meetings.addMembers);

	// MESSAGES (MEETINGS)
	app.get('/meetings/:meeting_id/messages/read', authAndLoadUser, loadMeeting, messages.readAll);
	app.post('/meetings/:meeting_id/messages/create', authAndLoadUser, loadMeeting, messages.create);

	// RESTAURANT
	app.post('/restaurants/login', authAndLoadRestaurant, webapp.login);

	//ORDER
	app.post('/orders/create', authAndLoadUser, orders.create);
	app.put('/orders/validateByOwner', authAndLoadUser, orders.validateByOwner);
	app.put('/orders/validateByRestaurant', authAndLoadRestaurant, orders.validateByRestaurant);
	app.get('/orders/read', authAndLoadUser, orders.readAll);
	app.get('/orders/read/:order_id', authAndLoadUser, orders.readOne);
	app.get('/orders/readMyOrder', authAndLoadUser, orders.readMyOrder);
	app.get('/orders/readForOwner/:owner_id', authAndLoadRestaurant, orders.readForOwner);

	//ORDERLINE
	app.post('/order_lines/CreateForOrder', authAndLoadUser, order_lines.CreateForOrder);
	app.delete('/order_lines/delete/:orderLine_id', authAndLoadUser, order_lines.delete);
	// RESERVATION
	app.post('/reservation/create', authAndLoadUser, reservations.create);
	app.post('/reservation/create/:meeting_id', authAndLoadUser, loadMeeting, reservations.createFromMeeting);
	app.put('/reservation/update/:reservation_id', authAndLoadUser, loadReservation, reservations.update);
	app.post('/reservation/:reservation_id/validateByRestaurant', authAndLoadRestaurant, reservations.validateByRestaurant);
	app.put('/reservation/:reservation_id/cancelByOwner', authAndLoadUser, loadReservation, reservations.cancelByOwner);
	app.put('/reservation/:reservation_id/cancelByRestaurant', authAndLoadRestaurant, loadReservation, reservations.cancelByRestaurant);
}

// This is a middleware. To use for routes  that needs a user logged-in
// if the request don't contains credentials or contains bad ones, this method will respond an error...
// else it will call the method (next())

authAndLoadUser = function(req, res, next)
{
	var userName = req.header("userName");
	var password = req.header("password");
	req.db.models.user.one({"userName":userName},
			function(err, user)
			{
				if (!user)
				{
					res.send(500, "authentification error user Not found");
					return ;
				}
				if (user.password != password)
				{
					res.send(500, "authentification bad password");
					return ;
				}
				req.user = user;
				next();
			});
}

authAndLoadRestaurant = function(req, res, next)
{
	console.log(req.session);
	var userName = req.session.userName;
	var password = req.session.password;
	if (!userName || !password)
	{
		res.redirect('/webApp/login');
		return ;
	}
	req.db.models.restaurant.one({"userName":userName},
		function(err, restaurant)
		{
			if (!restaurant)
			{
				res.render('login', { "errorMessage" : "Invalid username" });
				return ;
			}
			if (restaurant.password != password)
			{
				res.render('login', { "errorMessage" : "Invalid password" });
				return ;
			}		
			res.redirect('/webApp');
			req.restaurant = restaurant;
			next();
		});
}

loadMeeting = function(req, res, next)
{
	req.db.models.meeting.get(req.params.meeting_id, function (err, meeting)
	{
		if (err)
		{
			res.send(500, err);
			return ;
		}
		req.meeting = meeting;
		next();
	});
}

loadReservation = function(req, res,next)
{
	req.db.models.meeting.get(req.params.reservation_id, function (err, meeting)
	{
		if (err)
		{
			console.log(err);
			res.send(500, err);
			return ;
		}
		req.meeting = meeting;
		next();
	});
}
