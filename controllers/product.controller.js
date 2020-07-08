//require
var db = require('../db');
const shortId = require('shortid');

module.exports.index =(req, res)=> res.render('products/indexProducts',{products: db.get('products').value()});