require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors")
const errorHandler = require("./app/middlewares/errorHandler")
const routes = require("./routes");

const app = express();

app.use(cors({origin: process.env.FRONTEND_URL}))

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Listening routes"));
