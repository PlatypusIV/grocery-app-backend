const express = require("express");
const app = express();
const cors = require('cors');
const port = 3030;

const database = require("./../database/dbDialog");
const fileHandling = require('./../fileHandling');

const start = () => {
  app.listen(port, () => {
    console.log("Listening on port: " + port + " !");
  });
};

app.use(express.json()); // needed to parse the body of the request
app.use(cors({
  origin:'http://localhost:3000'
})); // needed to allow cross domain origin

app.get("/", (req, res) => {
  Promise.all(database.queryAllStores({})).then((data)=>{
    const resultArray = [];
    for(let i = 0, dLen = data.length;i<dLen;i++){
      resultArray.push(...data[i]);
    }
    res.send(resultArray);
  });
});

app.get("/categories",(req,res)=>{
  try {
    fileHandling.customReadFromFile('categories.json').then(data=>{
      res.send(data);
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/", (req, res) => {
  try {
    // console.log(req.params);
    // console.log(req.headers);
    // console.log(req.body);

    Promise.all(database.queryAllStores(req.body)).then((data)=>{
      const resultArray = [];
      for(let i = 0, dLen = data.length;i<dLen;i++){
        resultArray.push(...data[i]);
      }
      res.send(resultArray);
    });
  } catch (error) {
    console.log(error);
  }
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
