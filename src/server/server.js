const express = require("express");
const app = express();
const port = 3000;

const database = require("./../database/dbDialog");

const start = () => {
  app.listen(port, () => {
    console.log("Listening on port: " + port + " !");
  });
};

app.get("/", (req, res) => {

  Promise.all(database.queryAllStores({category:'hakkliha'})).then((data)=>{
    console.log(data);
    res.send(data);
  });
});

app.post("/", (req, res) => {
  try {
    res.send("Received post");
  } catch (error) {
    
  }

  res.send("Post request received.");
});

app.delete("/", (req, res) => {
  res.send("Delete request received.");
});

app.put("/", (req, res) => {
  res.send("Put request received.");
});

module.exports = {
  start
};
