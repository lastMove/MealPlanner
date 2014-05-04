exports.CreateForOrder = function(req, res, next)
{
	var quantity = req.body.quantity;
	var order_id = req.body.order_id;
	var user_id = req.body.user_id;
	var dish_id = req.body.dish_id;

	req.db.model.orderLine.create(
	{
		quantity : quantity,
		order_id : order_id,
		user_id : user_id,
		dish_id : dish_id
	}, function(err, orderLine) 
	{
		if (err)
			next(newErr(500, err));
		console.log("test create orderLine");
		res.send({"orderLine" : orderLine});
	});
}

exports.delete = function(req, res, next)
{
	req.db.model.orderLine.find({ id : req.params.orderLine_id}).remove(function(err)
	{
		if (err)
			next(newErr(500, err));
		console.log("orderLine delete");
		res.send("orderLine delete");
	});
}