require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors")
const routes = require("./routes");

const app = express();

app.use(cors({origin: process.env.FRONTEND_URL}))

app.use(express.json());
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(process.env.PORT, () => console.log("Listening routes"));
