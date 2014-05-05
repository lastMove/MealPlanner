var newErr = require('../error').newError;

exports.create = function(req, res, next)
{
	var date = new Date(req.body.date);
	var owner_id = req.user.id;
	var restaurant_id = req.body.restaurant_id ? req.body.restaurant_id : 0;

	console.log("");
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
		else
		{
			console.log("test create order");
			res.send({"order" : order});
		}
	});
}

exports.validateByOwner = function(req, res, next)
{
	var order_id = req.body.order_id;

	req.db.models.order.one({ owner_id : req.user.id, id : order_id }, function(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		else
		{
			order.status = !(order.status);
			order.save();
			res.send({"order validate" : order});
		}
	});
}

exports.validateByRestaurant = function(req, res, next)
{
	var order_id = req.body.order_id;

	req.db.models.order.one({ restaurant_id : req.restaurant.id, id : order_id }, function(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		else
		{
			order.status = !(order.status);
			order.save();
			res.send({"order validate" : order});
		}
	});
}

exports.readAll = function(req, res, next)
{
	req.db.models.order.find(function checkOrders(err, orders)
	{
		if (err || !orders)
			next(newErr(500, "orders not found"));
		else
		{
			console.log("readAll orders");
			res.send(orders);
		}
	});
}

exports.readOne = function(req, res, next)
{
	var order_id = req.params.order_id ? req.params.order_id : 0;

	req.db.models.order.get(order_id, function checkOrder(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		else
		{
			console.log("read order with id: " + order_id);
			res.send(order);
		}
	});
}

exports.readMyOrder = function(req, res, next)
{
	req.db.models.order.find({ owner_id : req.user.id }, function checkOrder(err, order)
	{
		if (err || !order)
			next(newErr(500, "order not found"));
		else
		{
			console.log("read order with owner_id: " + req.user.id);
			res.send(order);
		}
	});
}

exports.readForOwner = function(req, res, next)
{
	var owner_id = req.params.owner_id ? req.params.owner_id : 0;

	req.dn.models.order.find({ owner_id : owner_id}, function checkFind(err, order)
	{
		if (err || !order)
			next(newErr(500, "order nor found"));
		else
		{
			console.log("read order for owner_id: " + owner_id)
			res.send(order);
		}
	});
}