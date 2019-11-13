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
  // const resPromise = database.queryFromDb({store:"prisma"});
  // database.queryFromDb({category:'linnuliha'}, "prisma").then(fulfilled => {
  //   console.log(fulfilled);
  //   res.send(fulfilled);
  //   res.send("Testing!");
  // });
  // database.queryFromDb({"store":"prisma"});

  Promise.all(database.queryAllStores({category:'hakkliha'})).then((data)=>{
    console.log(data);
    res.send(data);
  });
  // console.log(database.queryAllStores({category:'linnuliha'}));
  // res.send(Promise.all(database.queryAllStores({category:'hakkliha'})));
});

app.post("/", (req, res) => {
  try {
    // database.queryFromDb()
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
