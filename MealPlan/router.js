var newErr = require('./error').newError;
var users = require('./routes/users');

exports.myRouter = function(app)
{
	app.get('/',authAndLoadUser, function(req, res)
		{
		//	res.send("Wesh");
			throw newErr(409, "hahaha");
			res.send("Wesh");
		});
	app.get('/auth', authAndLoadUser, users.auth);
	app.post('/users/create', users.createUser);
	app.delete('/users/delete', authAndLoadUser, users.delete);
	app.get('/users/read', authAndLoadUser, users.list);
	app.put('/users/update', authAndLoadUser, users.update);
	app.get('/users/friends/read', authAndLoadUser, users.friendsList);
	app.put('/users/friends/add/:friend_id', authAndLoadUser, users.addFriend);
	app.put('/users/friends/remove/:friend_id', authAndLoadUser, users.removeFriend);

}

authAndLoadUser = function(req, res, next)
{
	var userName = req.header("userName");
	var password = req.header("password");
		console.log("AUTH");
		req.db.models.user.one({"userName":userName},
			function(err, user)
			{
				if (!user)
				{
					res.send(500, "user Not found");
					return ;
				}
				if (user.password != password)
				{
					res.send(500, "bad password");
					return ;
				}
				req.user = user;
				next();
			});
}