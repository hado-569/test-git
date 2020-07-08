var express = require('express');
var router = express.Router();
var controller = require('../controllers/user.controller');
const validate = require('../validates/user.validate');


router.get('/', controller.index);

router.get('/search',controller.search);

router.get('/create', controller.create);

router.get('/:id',controller.getID);

router.post('/create', validate.postCreate, controller.postCreate);


module.exports = router;
