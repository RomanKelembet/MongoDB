var express = require('express');
var router = express.Router();

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mcqueen";
var menu = [];

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var mydb = db.db("mcqueen");
    var collection =mydb.collection("cars");
    collection.find({}).project({ _id: 0,
        title: 1, nick: 1 }).toArray(function(err,result){
        if (err) throw err;
        menu = result;
        console.log(menu);
        db.close();
    })
});

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express', menu:menu});
});

router.get('/car/:nick', function(req, res, next) {
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var ourdb = db.db("mcqueen");
        var collection = ourdb.collection("cars");
        collection.findOne({nick:req.params.nick},function(err,result){
            if (err) throw err;
            car = result;
            console.log(car);
            db.close();
            res.render('car', {
                title: car.title,
                picture: car.avatar,
                about: car.desc,
                menu:menu
            });
        })
    });
});


module.exports = router;
