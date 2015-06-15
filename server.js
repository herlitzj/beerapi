var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var beerModel = require('./models/beer');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

app.use(bodyParser.urlencoded( {
    extended: true
}));

app.use('/api', router);

mongoose.connect('mongodb://localhost:27017/beerapi');

router.get('/', function(req, res) {
    res.json({ message: "You are dangerously low on BEER." });
});

var beersRoute = router.route('/beers');

beersRoute.post(function(req, res) {
    var beer = new beerModel();
    
    beer.name = req.body.name;
    beer.type = req.body.type;
    beer.quantity = req.body.quantity;
    
    beer.save(function(err) {
        if (err)
            res.send(err);
        
        res.json({ message: 'Beer added to the locker!', data: beer });
    });
});

beersRoute.get(function(req, res) {
    beerModel.find(function(err, beers) {
        if (err)
            res.send(err);
        
        res.json(beers);
    });
});

var beerRoute = router.route('/beers/:beer_id');

beerRoute.get(function(req, res) {
    beerModel.findById(req.params.beer_id, function(err, beer) {
        if(err) 
            res.send(err);
            
        res.json(beer);
    });
});

beerRoute.put(function(req, res) {
    beerModel.findById(req.params.beer_id, function(err, beer) {
        if(err)
            res.send(err);
        
        beer.quantity = req.body.quantity;
        
        beer.save(function(err) {
            if(err)
                res.send(err);
                
            res.json(beer);
        });
    });
});

beerRoute.delete(function(req, res) {
    beerModel.findByIdAndRemove(req.params.beer_id, function(err) {
        if(err)
            res.send(err);
        res.json({ message: "Beer removed from the locker" });
    });
});

app.listen(port);
console.log("Listening on port " + port);