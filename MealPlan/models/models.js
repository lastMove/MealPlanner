

checkError = function(cb, err)
{
    if (err)
        return cb(err);
    return cb();
}

module.exports = function(db, cb)
{
    
    db.load("./user.js", function (err) {checkError(cb, err)});
    db.load("./meeting.js", function (err) {checkError(cb, err)});
    db.load("./Order.js", function (err) {checkError(cb, err)});
    db.load("./order_line.js", function (err) {checkError(cb, err)});
    db.load("./reservation.js", function (err) {checkError(cb, err)});
    db.load("./restaurant.js", function (err) {checkError(cb, err)});
    db.load("./dish.js", function(err) {checkError(cb, err)});
    db.load("./message.js", function(err) {checkError(cb, err)});

    var Message = db.models.message;
    var User = db.models.user;
    var Dish = db.models.dish; 
    var Meeting = db.models.meeting;
    var Order = db.models.order;
    var OrderLine = db.models.orderLine;
    var Reservation = db.models.reservation;
    var Restaurant = db.models.restaurant;

    Message.hasOne("sender", User, {reverse : "messages"});
    Message.hasOne("meetings", Meeting, {reverse : "messages"});
    Meeting.hasOne("Owner", User, {reverse : "meetings"});
    Meeting.hasMany("members", User, {}, {reverse : "meetings"});
    Meeting.hasOne("restaurant", Restaurant, {}, {reverse : "meetings"});
    
    Order.hasOne("owner", User, {reverse : "ordersOwned"});
    Order.hasOne("restaurant", Restaurant, {reverse : "orders"});

    OrderLine.hasOne("order", Order, {reverse : "orderLines"});
    OrderLine.hasOne("user", User, {reverse : "orderLines"});
    OrderLine.hasOne("dish", Dish, {reverse : "orderLines"});

    Reservation.hasOne("owner", User, {reverse: "reservationsOwned"});
    Reservation.hasOne("restaurant", Restaurant, {reverse : "reservations"});
    Reservation.hasOne('meeting', Meeting);

    Dish.hasOne("restaurant", Restaurant, {reverse : "dishes"});

    User.hasMany("friends");
    db.sync();
}   