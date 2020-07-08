//require
var db = require('../db');
const shortId = require('shortid');

module.exports.index = (req, res)=> res.render('users/usersList', {users: db.get('users').value() });

module.exports.search = function(req, res){

	var q= req.query.q;
	var matchedUsers = db.get('users').value().filter(function(user){
			return user.companyName.toLowerCase().indexOf(q.toLowerCase())!==-1;
	});
	res.render("users/usersList",{users:matchedUsers, valSearch: q});
};
module.exports.create = (req, res)=> res.render('users/createUser');

module.exports.getID = function(req, res){
	var id = req.params.id;
	var userID = db.get('users').find({id: id}).value();

	res.render('users/viewDetail',{user: userID});
};

module.exports.postCreate = function(req, res){
	
	req.body.id= shortId.generate();
	console.log(res.locals);
	db.get('users').push(req.body).write();
	res.redirect('/users');
};

