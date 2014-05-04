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
	}, function checkCreate(err, order)
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

	req.db.models.order.find({ owner_id:owner_id, id:order_id }, function checkFind(err, order)
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

exports.readAll = function(req, res, next)
{
	req.db.model.order.get(function checkOrders(err, orders)
	{
		if (err || !orders)
			next(newErr(500, "orders not found"));
		console.log("readAll orders");
		res.send(orders);
	});
}

exports.readOne = function(req, res, next)
{
	var order_id = req.params.order_id ? req.params.order_id : 0;

	req.db.model.order.get(order_id, function checkOrder(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		console.log("read order with id: " + order_id);
		res.send(order);
	});
}

exports.readByOwner = function(req, res, next)
{
	var owner_id = req.params.owner_id ? req.params.owner_id : 0;

	req.db.model.order.find({ owner_id : owner_id }, function checkOrder(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		console.log("read order with owner_id: " + owner_id);
		res.send(order);
	});
}