var MongoClient = require('mongodb').MongoClient;
var data = require("./data.js").data;

var url = "mongodb://localhost:27017/mcqueen";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var mydb= db.db("mcqueen");
    mydb.dropDatabase();
    var collection = mydb.collection("cars");
    collection.insertMany(data,function(){
        console.log("Cars data inserted");
        db.close()
    })
});
