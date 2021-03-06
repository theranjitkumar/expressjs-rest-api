var express = require('express');
var app = express()

var mongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://localhost:27017/'; // Loca system connection string
const url = 'mongodb+srv://mongo:mongo@cluster0-0epmu.mongodb.net'; // mongodb cloud atlas connection string

app.get('/users', function (req, res) {
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("meanApp");
        dbo.collection('users').find({}).sort({id:1}).toArray(function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
        });
        db.close();
    })
});

app.get('/user/:id', function (req, res) {
   
    mongoClient.connect(url, {useNewUrlParser: true}, function (err, db) {
        if (err) throw err;
        var dbo = db.db("blogapp");
        dbo.collection('users').findOne({
            id: parseInt(req.params.id)
        }, function (err, result) {
            if (err) throw err;
            // console.log(result);
            res.send(result);
        });
        db.close();
    })
});


app.listen('3000');