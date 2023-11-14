import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Homepage");
});

app.listen(3000, () => {
  console.log("This app is running on http://localhost:3000");
});
