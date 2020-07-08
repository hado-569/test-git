
module.exports.postCreate = function (req, res, next) {
	var errors =[];
	if (!req.body.companyName) {
		errors.push('companyName is required');
	}

	if (!req.body.contact) {
		errors.push('Contact is required');
	}

	if (!req.body.country) {
		errors.push('Country is required');
	}

	if (errors.leght) {
		res.render('users/createUser',{
			errors: errors,
			values: req.body
		});
		return;
	}
	res.locals.success = true;
	next();
}