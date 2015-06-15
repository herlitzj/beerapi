var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var router = express.Router();

router.get('/', function(req, res) {
    res.json({ message: "You are dangerously low on beer." });
});

app.use('/api', router);

app.listen(port);
console.log("Listening on port " + port);