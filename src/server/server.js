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
    const resultArray = [];
    for(let i = 0, dLen = data.length;i<dLen;i++){
      resultArray.push(...data[i]);
    }
    res.send(resultArray);
  });
});

app.post("/", (req, res) => {
  try {
    
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
