require("dotenv").config();

const express = require("express");
const routes = require("./routes");
const { query } = require("./database");

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3000, () => console.log("Servidor rodando"));
