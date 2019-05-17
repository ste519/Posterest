//Server backend file
const express = require('express');
app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static_files'));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ste519:123@cluster0-9uig7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

app.get('/feeds', (req, res) => {



  console.log("hello");
  client.connect((err) => {
    const collection = client.db("test").collection("ins");
    collection.find({}).toArray((err, result)=>{
      if (err) throw err;
      else res.send(result);
    });
  });

});


app.listen(8000, () => {
  console.log('Server started at http://localhost:8000/');
});
