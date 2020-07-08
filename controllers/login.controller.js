//require
var db = require('../db');
var md5 = require('md5');
module.exports.index =(req, res )=> res.render('login/indexLogin'); 
module.exports.postLogin = function(req, res) {
	var email = req.body.email;
	var pass = req.body.pass;
	var user = db.get('users').find({email: email}).value();

	if (!user) {
		res.render('login/indexLogin', {
			errors:[
				'Email does not exit !'
			],
			values: req.body
		});
		return;
	}

	var hashesPass = md5(pass);

	if (user.pass!== hashesPass) {
		res.render('login/indexLogin',{
			errors:[
				'Wrong Password !'
			],
			values: req.body
		});
		return;
	}

	res.cookie('userID', user.id,{
		signed: true
	});

	res.redirect('/users');
};