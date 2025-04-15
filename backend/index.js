const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require('dotenv')
const config = require('./config')
const route = require('./route/route')
dotenv.config()

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use('/api', route);

app.listen(config.port,()=>{
  console.log(`Server is runnig on port ${config.port}`)
})

mongoose.connect(config.dbConnectionUrl)
  .then(() => console.log("Connected to Database"))
  .catch((err) => console.log(err));












