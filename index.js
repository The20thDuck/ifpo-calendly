const express = require('express')
const path = require('path')
const app = express()
const port = 3000
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer();

const puppet = require('./puppet.js');

// for parsing application/json
app.use(bodyParser.json()); 

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(express.static(path.join(__dirname, "public")))

app.post('/', async function(req, res){
  if(!req.body.email || !req.body.password){
     res.status("400");
     res.redirect("/");
  } else {
      // console.log(`${req.body.email} ${req.body.password}`)
      let valid = await puppet.login(req.body.email, req.body.password);
      console.log(`valid: ${valid}`);
      res.redirect('/links.html');
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
