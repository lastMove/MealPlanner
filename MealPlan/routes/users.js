var express = require('express');
var newErr = require('../error').newError;

exports.createUser = function(req, res, next)
{
	console.log("toto");
	var userName = req.body.userName;
	var password = req.body.password;
	var mail = req.body.mail;

	if (!userName || !password || !mail)
		throw newErr(500, "userName, password or mail missing");
	req.db.models.user.create(
	{
		userName:userName,
		password:password,
		mail:mail
	}, function(err, user)
	{
		console.log(err)
		if (err)
			return next(err);
		res.send(user);
	});
}

exports.auth = function(req, res, next)
{
	res.send(req.user);
}

exports.update = function(req, res, next)
{
	if (req.body.userName)
		req.user.userName = req.body.userName;
	if (req.body.password)
		req.user.password = req.body.password;
	if (req.body.mail)
		req.user.mail = req.body.mail;
	req.user.save(function(err, user)
		{
			if (err)
				next(err);
			res.send(user);
		});
}

exports.delete = function(req, res, next)	
{
	req.user.remove(function(err)
	{
		if (err)
		next(err);
		res.send("Removed");
	});
}

exports.list = function(req, res, next)
{
	req.db.models.user.find().omit('password').run(function(err, users)
	{
		if (err)
			next(err);
		res.send(users);
	});
}

exports.friendsList = function(req, res, next)
{
	req.user.getFriends(function(err, friends)
	{
		if (err)
			next(err);
		res.send(friends);
	});
};

exports.addFriend = function(req, res, next)
{
	req.db.models.user.get(req.params.friend_id, function(err, friend)
	{
		if (err || !friend)
			next(newErr(500, "friend not found"));
		req.user.addFriends(friend, function(err, data)
		{
			if (err)
				next(err);
			res.send(data);
		});
	});
};

exports.removeFriend = function(req, res, next)
{
	req.db.models.user.get(req.params.friend_id, function(err, friend)
	{
		if (err || !friend)
			next(newErr(500, "friend not found"));
		req.user.removeFriends(friend, function(err, data)
		{
			if (err)
				next(err);
			res.send(data);
		});});
}
