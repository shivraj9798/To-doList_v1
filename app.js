const express = require("express")
const bodyParser = require("body-parser")
const app = express();
const date = require(__dirname + "/date.js")
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"))
app.set('view engine', 'ejs');
const items = ["Buy Food", "Cook food", "Eat Food"];
const workItems = []
const day = date.getDate();

// console.log(date());

app.get("/", function(req, res) {
  // console.log(today.getDay());

  res.render('list', {
    listTitle: day,
    newlistItem: items

  })
})

app.post("/", function(req, res) {
  console.log(req.body);

  const item = req.body.listName;
  if (req.body.list === "Work List") {
    workItems.push(item)
    res.redirect("/work")
  } else {
    items.push(item)
    res.redirect("/")
  }



})

app.get("/work", function(req, res) {
  res.render("list", {
    listTitle: "Work List",
    newlistItem: workItems
  })
})

app.post("/work", function(res, res) {
  const item = req.body.listName;
  workItems.push(item)
})

app.get("/about", function(req, res) {
  res.render("about")
})



app.listen(3000, function() {
  console.log("Server running on port 3000 successfully");
})
