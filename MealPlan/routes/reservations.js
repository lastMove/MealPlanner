var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var name = req.body.name;
	var peopleNumber = req.body.peopleNumber;
	var restaurantId = req.body.restaurant_id ? req.body.restaurant_id : 0;
	var reservationDate = req.body.reservationDate;
	var meetingId = req.meeting ? req.meeting.id : 0;
	req.db.models.reservation.create(
	{
		name: name,
		peopleNumber : peopleNumber,
		meeting_id : meetingId,
		owner_id : req.user.id,
		restaurant_id :restaurantId,
		reservationDate : reservationDate
	}, function(err, reservation)
	{
		if (err)
			next(newErr(500, err));
		res.send(reservation);
	});
}

exports.readByUser = function(req, res, next)
{
	req.user.getReservationsOwned(function(err, reservations)
	{
		if (err)
			next(newErr(500, err));
		res.send(reservations);
	});
}


exports.update = function(req, res, next)
{
	if (req.body.name)
		req.reservation.name = req.body.name;
	if (req.body.peopleNumber)
		req.reservation.name = req.body.peopleNumber;
	req.reservation.save(function(err, reservation)
	{
		console.log("err:" + err);
				if (err)
			next(newErr(500, err));
		res.send(reservation);

	});
}

exports.cancelByOwner = function(req, res, next)
{
	if (req.user.id != req.reservation.owner_id)
	{
		next(newErr(500,"authentification Error, user is not the owner"));
		return ;
	}
	req.reservation.validationStatus = "cancelledByUser";
	req.reservation.save(function(err, data)
	{
		if (err)
			next(newErr(500, err));
		res.send(data);
	});
}

exports.validateByRestaurant = function(req, res, next)
{
	if (req.user.id != req.restaurant.id)
	{
		next(newErr(500, "authentification Error, restaurant is not the owner"));
		return ;
	}
	req.reservation.validationStatus = "validateByRestaurant";
	req.reservation.save(function(err, data)
	{
		if (err)
			next(newErr(500, err));
		res.send(data);
	});
}

exports.cancelByRestaurant = function(req, res, next)
{
	if (req.user.id != req.restaurant.id)
	{
		next(newErr(500, "authentification Error, restaurant is not the owner"));
		return ;
	}
	req.reservation.validationStatus = "cancelledByRestaurant";
	req.reservation.save(function(err, data)
	{
		if (err)
			next(newErr(500, err));
		res.send(data);
	});
}
