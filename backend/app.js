const express = require("express");
const app = express();
const cors = require("cors");

app.use(cors);
app.use(express.json());

const mongoose = require("mongoose");

const link =
  "mongodb+srv://abhijeet180105:dKvEmjzoyOWLfOHb@cluster0.faluy0z.mongodb.net/?retryWrites=true&w=majority";
mongoose
  .connect(link, {
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection successful!"));

const router = require("./router");
console.log("jsi");
app.use("/", router);

app.listen(8000, () => {
  console.log("http://localhost:8000/");
});
