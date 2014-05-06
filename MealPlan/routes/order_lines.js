var newErr = require('../error').newError;

exports.createForOrder = function(req, res, next)
{
	var user_id = req.user.id;
	var quantity = req.body.quantity;
	var order_id = req.body.order_id;
	var dish_id = req.body.dish_id;

	req.db.models.orderLine.create(
	{
		quantity : quantity,
		order_id : order_id,
		user_id : user_id,
		dish_id : dish_id
	}, function(err, orderLine) 
	{
		if (err)
			next(newErr(500, err));
		else
		{
			console.log("test create orderLine");
			res.send({"orderLine" : orderLine});
		}
	});
}

exports.delete = function(req, res, next)
{
	req.db.models.orderLine.find({ id : req.params.orderLine_id}).remove(function(err)
	{
		if (err)
			next(newErr(500, err));
		else
		{
			console.log("orderLine delete");
			res.send("orderLine delete");
		}
	});
}

exports.update = function(req, res, next)
{
	var orderLine_id = req.params.orderLine_id;
	var user_id = req.user.id;
	var quantity = req.body.quantity;
	var order_id = req.body.order_id;
	var dish_id = req.body.dish_id;

	if (quantity || order_id || dish_id)
	{
		req.db.models.orderLine.get(orderLine_id, function(err, orderLine) {
			if (err)
				next(newErr(500, err));
			else
			{
				if (quantity)
					orderLine.quantity = quantity;
				if (order_id)
					orderLine.order_id = order_id;
				if (dish_id)
					orderLine.dish_id = dish_id;
				orderLine.save(function(err, orderLine) {
					if (err)
						next(newErr(500, err));
					else
						res.send(orderLine);
				});
			}
		});
	}
}

exports.readForOrder = function(req, res, next)
{
	var order_id = req.params.order_id;

	req.db.models.orderLine.find({ order_id : order_id }, function(err, orderLine) {
		if (err)
			next(newErr(500, "OrderLines not found"));
		else
			res.send(orderLine);
	});
}