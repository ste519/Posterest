//Server backend file
const express = require('express');
app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static('static_files'));


const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://ste519:123@cluster0-9uig7.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });




app.get('/feeds', async (req, res) => {
  // db.all() fetches all results from an SQL query into the 'rows' variable:
  // db.all('SELECT name FROM users', (err, rows) => {
  //   console.log(rows);
  //   const allUsernames = rows.map(e => e.name);
  //   console.log(allUsernames);
  //   res.send(allUsernames);
  // });
  console.log("hello");
  client.connect(err => {
    const collection = client.db("test").collection("rss");
    collection.find({}).toArray((err, result) => {
      if (err) throw err;
      res.send(result);
    });
  });
  client.db("test").close();
});


app.listen(8000, () => {
  console.log('Server started at http://localhost:8000/');
});
