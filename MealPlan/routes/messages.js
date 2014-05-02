var newErr = require('../error').newError;

console.log("Messages ");
exports.create = function(req, res, next)
{
	var text = req.body.text;

	req.db.models.message.create(
	{
		text : text,
		sender_id : req.user.id,
		meetings_id : req.meeting.id

	}, function(err, message)
	{
		if (err)
			next(newErr(500, err));
		console.log("test");
		res.send({"message" :message});
	});
}

exports.readAll = function(req, res, next)
{
	req.db.models.message.find({"meetings_id":req.meeting.id}, function(err, messages)
	{
		if (err)
			next(newErr(500, err));
		res.send(messages);
	});
}
