const express = require("express");
const app = express();
const port = 3000;

const database = require("./../database/dbDialog");

const start = () => {
  app.listen(port, () => {
    console.log("Listening on port: " + port + " !");
  });
};

app.use(express.json()); // needed to parse the body of the request

app.get("/", (req, res) => {

  Promise.all(database.queryAllStores({})).then((data)=>{
    const resultArray = [];
    for(let i = 0, dLen = data.length;i<dLen;i++){
      resultArray.push(...data[i]);
    }
    res.send(resultArray);
  });
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
