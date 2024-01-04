const { connectDb } = require('./config/dbConnection')
const bodyParser = require('body-parser');
const express = require('express')
const path = require("path");
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT

connectDb()

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(cors());
app.use("/uploads", express.static(path.resolve(__dirname, "uploads")));
app.use(express.static(path.join()));
app.use(bodyParser.json());
app.use(express.json());

app.use("/contacts", require("./router/contactRouter"));

app.listen(port, () => {
    console.log(`Server Started at ${port}`)
})