var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var address = req.body.address;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;
	var name =req.body.name;
	
	req.db.models.meeting.create(
	{
		address:address,
		startDate:startDate,
		endDate: endDate,
		restaurant_id: restaurant_id,
		owner_id : req.user.id,
		name : req.body.name
	}, function(err, meeting)
	{
		if (err)
			return next(err);
		meeting.addMembers(req.user, function(err, data)
		{
			if (err)
				next(newErr(500, err));
			res.send(meeting);

		});
	})
}

exports.update = function(req, res, next)
{
	var address = req.body.address;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;
	var name = req.body.name;

	if (address)
		req.meeting.address = address;
	if (startDate)
		req.meeting.startDate = new Date(startDate);
	if (endDate)
		req.meeting.endDate = new Date(endDate);
	if (restaurant_id)
		req.meeting.restaurant_id = restaurant_id;
	if (name)
		req.meeting.name = name;
	req.meeting.save(function(err, meeting)
	{	
		if (err)
			next(err);
		res.send(meeting);
	})
}

exports.readOne = function(req, res, next)
{
	res.send(req.meeting);
}

exports.delete = function(req, res, next)
{
	req.meeting.remove(function(err)
	{
		if (err)
			next(err);
	})
}

exports.listMembers = function(req, res, next)
{
	req.meeting.getMembers(function(err, members)
	{
		if (err)
			next(newErr(500, err));
		res.send(members);
	});
}

exports.readByUser = function(req, res, next)
{
	req.user.getMeetings(function(err, meetings)
	{
		if (err)
			next(newErr(500, err));
		res.send(meetings);
	})	
}

exports.removeMember = function(req, res, next)
{
	req.db.models.user.get(req.params.user_id, function(err, user)
	{
		if (err || !user)
			next(newErr(500, "member not found"));
		req.meeting.removeMembers(user, function(err, data)
		{
			if (err)
			{
				next(err);
				return ;
			}
			res.send(data);
		});
	});
}

exports.addMembers = function(req, res, next)
{
	console.log("Add it");
	req.db.models.user.get(req.params.user_id, function(err, friend)
	{
		console.log("Get user" + JSON.stringify(friend)); 
		if (err || !friend)
			next(newErr(500, "user not found"));
		req.meeting.addMembers(friend, function(err, data)
		{
			if (err)
				next(err);
			res.send(data);
		});
	});	
}

