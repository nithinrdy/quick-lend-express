const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 4000;

const whiteList = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}

app.use(cors(corsOptions));

app.get("/", (req, res) => {
	res.send("Hello World!");
});

app.post("/login", (req, res) => {
  console.log(req.body);
  res.send("Hello World!");
});


app.listen(port, () => {
	console.log(`Example app listening at http://localhost:${port}`);
});
