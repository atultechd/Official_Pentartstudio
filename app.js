const express = require("express");
const path = require("path");
const app = express();
const mongoose = require('mongoose');
const bodyparser = require("body-parser");
main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost/contactpentart');
}
const port = process.env.PORT || 8000;

// DEFINE MONGOOSE SCHEMA
const contactSchema = new mongoose.Schema({
  email: String,
  desc: String
});

const contact = mongoose.model('contact', contactSchema);

// EXPRESS SPECIFIC STUF
app.use('/static',express.static('static')); // for serving static files
app.use(express.urlencoded());

// PUG SPECIFIC STUFF
app.set('view engine','pug');// set the template engine as pug
app.set('views', path.join(__dirname, 'views'));// set the view directory

// ENDPOINTS
app.get("/",(req,res)=>{
  const params = {};
  res.status(200).render('index.pug', params);
});

app.post("/",(req,res)=>{
  var myData = new contact(req.body);
  myData.save().then(()=>{
    res.send("This item has been saved to the database.");
  }).catch(()=>{
    res.status(400).send("Item was not saved to the database.");
  });

});

// START THE SERVER
app.listen(port,()=>{
  console.log(`The application started successfully on port ${port}`);
});