var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var address = req.body.address;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;

	req.db.models.meeting.create(
	{
		address:address,
		startDate:startDate,
		endDate: endDate,
		restaurant_id: restaurant_id,
		owner_id : req.user.id
	}, function(err, meeting)
	{
		if (err)
			return next(err);
		meeting.addMembers(req.user, function(err, data)
		{
			if (err)
				next(newErr(500, err));
			res.send(meeting);

		})
	})
}

exports.update = function(req, res, next)
{
	var address = req.body.address;
	var startDate = req.body.startDate;
	var endDate = req.body.endDate;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;
	if (address)
		req.meeting.address = address;
	if (startDate)
		req.meeting.startDate = new Date(startDate);
	if (endDate)
		req.meeting.endDate = new Date(endDate);
	if (restaurant_id)
		req.meeting.restaurant_id = restaurant_id;
	req.meeting.save(function(err, meeting)
	{	
		if (err)
			next(err);
		res.send(meeting);
	})
}

exports.readOne = function(req, res, next)
{
	req.db.models.meeting.get(req.params.meeting_id, function (err, meeting)
	{
		if (err)
			next(newErr(500, err));
		res.send(meeting);
	});
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

exports.addMembers = function(req, res, next)
{
	req.db.models.user.get(req.params.user_id, function(err, friend)
	{
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

