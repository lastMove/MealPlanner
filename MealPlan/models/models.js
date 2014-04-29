

checkError = function(cb, err)
{
    if (err)
        return cb(err);
    return cb();
}

module.exports = function(db, cb)
{
    
    db.load("./user.js", function (err) {checkError(cb, err)});
    /*
    db.load("./alert.js", function (err) {checkError(cb, err)});
    db.load("./comment.js", function (err) {checkError(cb, err)});
    db.load("./metropole.js", function (err) {checkError(cb, err)});
    db.load("./period.js", function (err) {checkError(cb, err)});
    db.load("./stop.js", function (err) {checkError(cb, err)});
    db.load("./line.js", function (err) {checkError(cb, err)});
    db.load("./types.js", function (err) {checkError(cb, err)});
    db.load("./historique.js", function(err) {checkError(cb, err)});
    db.load("./notification.js", function(err) {checkError(cb, err)});
    db.load("./version.js", function(err) { checkError(cb, err);});
    db.load("./session.js", function(err) { checkError(cb, err);});

    var User = db.models.user;
    var Alert = db.models.alert;
    var Comment = db.models.comment;
    var Metropole = db.models.metropole;
    var Stop = db.models.stop;
    var Line = db.models.line;
    var Period = db.models.period;
    var Types = db.models.types;
    var Hist = db.models.historique;
    var Notif = db.models.notification;
    var Version = db.models.version;
    var Session = db.models.session;

    Version.hasOne("metropole", Metropole);
	Alert.hasOne("stop", Stop, {reverse : "alerts"});
	Alert.hasOne("line", Line, {reverse : "alerts"});
	Alert.hasOne("user", User, {reverse : "alerts"});
    Alert.hasOne("metropole", Alert, {reverse : "alerts"});
	Stop.hasOne("metropole", Metropole, {reverse : "stops"});
	Stop.hasMany("lines", Line, {}, {reverse : "stops"});
	
    Comment.hasOne("alert", Alert, {reverse : "comments"});
	Comment.hasOne("user", User, {reverse : "comments"});
	
	Line.hasOne("metropole", Metropole, {reverse : "lines"});
    Line.hasOne("types", Types, {reverse : "lines"});

	Period.hasOne("user", User, {reverse : "periods"});
    Period.hasOne("line", Line, {reverse : 'periods'});	
    Hist.hasOne("user", User, {reverse : "hist"});
    Hist.hasOne("comment", Comment, {reverse: "hist"});
    Hist.hasOne("alert", Alert, {reverse:"hist"});
    
    Notif.hasOne("user", User, {reverse: "notifications"});

    Session.hasOne("user", User, {reverse:"sessions"});
    */
    db.sync();
}   