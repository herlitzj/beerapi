var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var passport = require('passport');
var beerController = require('./controllers/beer');
var userController = require('./controllers/user');
var authController = require('./controllers/auth');
var clientController = require('./controllers/client');


mongoose.connect('mongodb://localhost:27017/beerapi');

app.use(bodyParser.urlencoded( {
    extended: true
}));
app.use(passport.initialize());
app.use('/api', router);

router.route('/beers')
    .post(authController.isAuthenticated, beerController.postBeers)
    .get(authController.isAuthenticated, beerController.getBeers);
    
router.route('/beers/:beer_id')
    .get(authController.isAuthenticated, beerController.getBeer)
    .put(authController.isAuthenticated, beerController.putBeer)
    .delete(authController.isAuthenticated, beerController.deleteBeer);
    
router.route('/users')
    .post(userController.postUsers)
    .get(authController.isAuthenticated, userController.getUsers)
    .delete(authController.isAuthenticated, userController.deleteUser);
    
router.route('/users/:user_id')
    .get(authController.isAuthenticated, userController.getUser)
    .delete(authController.isAuthenticated, userController.deleteUser);
    
router.route('/clients')
    .post(authController.isAuthenticated, clientController.postClients)
    .get(authController.isAuthenticated, clientController.getClients);

app.listen(port);
console.log("Listening on port " + port);
