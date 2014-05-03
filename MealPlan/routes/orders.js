var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var date = req.body.date;
	var owner_id = req.body.owner_id ? req.body.owner_id : 0;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;

	req.db.models.order.create(
	{
		date : date,
		statut : false,
		owner_id : owner_id,
		restaurant_id : restaurant_id
	}, function(err, order)
	{
		if (err)
			next(newErr(500, err));
		console.log("test create order");
		res.send({"order" : order});
	});
}

exports.validateByOwner = function(req, res, next)
{
	var order_id = req.body.order_id;
	var owner_id = req.body.owner_id;

	req.db.models.order.find({ owner_id:owner_id, id:order_id }, function(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		order[0].statut = !order[0].statut;
		res.send({"order validate" : order[0]});
	});
}

exports.validateByRestaurant = function(req, res, next)
{
	var order_id = req.body.order_id;
	var restaurant_id = req.body.restaurant_id;

	req.db.models.order.find({ restaurant_id:restaurant_id, id:order_id }, function(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		order[0].statut = !order[0].statut;
		res.send({"order validate" : order[0]});
	});
}