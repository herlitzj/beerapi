var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerController = require('./controllers/beer')
var userController = require('./controllers/user')
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

mongoose.connect('mongodb://localhost:27017/beerapi');

app.use(bodyParser.urlencoded( {
    extended: true
}));
app.use('/api', router);

router.route('/beers')
    .post(beerController.postBeers)
    .get(beerController.getBeers);
    
router.route('/beers/:beer_id')
    .get(beerController.getBeer)
    .put(beerController.putBeer)
    .delete(beerController.deleteBeer);
    
router.route('/users')
    .post(userController.postUsers)
    .get(userController.getUsers)

app.listen(port);
console.log("Listening on port " + port);