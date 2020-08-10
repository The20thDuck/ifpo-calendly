const express = require('express')
const app = express()

const path = require('path')

var bodyParser = require('body-parser');
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

var multer = require('multer');
var upload = multer();

const puppet = require('./puppet.js');
const requests = require('./requests.js');

const cookieParser = require('cookie-parser');
app.use(cookieParser());

const port = 3000

app.use(express.static(path.join(__dirname, "public")))

app.post('/', async function(req, res){
  if(!req.body.email || !req.body.password){
     res.status("400");
     res.redirect("/");
  } else {
      let valid = await puppet.login(req.body.email, req.body.password);
      // console.log(`valid: ${valid}`);
      if (!!valid) {
        let options = {
          maxAge: 1000 * 60 * 60 * 3,
          httpOnly: true
        }
        // console.log(valid)
        res.cookie("_calendly_session", valid[0], options);
        res.cookie("X-CSRF-Token", valid[1], options);
        res.redirect('/links.html');
      }
      else {
        res.status("400");
        res.redirect("/")
      }
  }
});

app.post('/requests', async function(req, res) {
    // console.log(req.cookies);
    if (!!req.cookies._calendly_session && !!req.cookies["X-CSRF-Token"]) {
        // console.log(req.body)
        let session = req.cookies._calendly_session;
        let csrf = req.cookies["X-CSRF-Token"];
        if (req.body.action === "getEvents") {
          let events = await requests.getEvents(session, csrf);
          res.send(JSON.stringify(events));
        }
        else if (req.body.action === "genLinks" && typeof req.body.number === "number" && req.body.number > 0 && typeof req.body.event_id === "number") {
          let links = []
          let max = Math.min(req.body.number, 500);
          for (let i = 0; i < max; i++) {
            let link = await requests.genLink(session, csrf, req.body.event_id);
            // console.log(link);
            links.push(link.booking_url);
          }
          res.send(JSON.stringify(links));
        }
        else {
          res.status("400");
          res.send("Invalid input")
        }
    }
    else {
      res.status("400");
      res.redirect("/");
    }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
