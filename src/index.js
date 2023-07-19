require("dotenv").config();
require("express-async-errors");

const express = require("express");
const cors = require("cors")
const passport = require("passport")
const cookieSession = require("cookie-session")
const passportSetup = require("./passport")
const authHandler = require("./app/middlewares/authHandler")
const errorHandler = require("./app/middlewares/errorHandler")
const routes = require("./routes");
const authRoutes = require("./routes/authRoutes")

const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: ["mycontacts"],
    maxAge: 24 * 60 * 60 * 100,
  })
)

app.use(passport.initialize())
app.use(passport.session())

app.use(cors({origin: process.env.FRONTEND_URL, credentials: true}))

app.use("/auth", authRoutes)

app.use(authHandler)

app.use(express.json());
app.use(routes);
app.use(errorHandler);

app.listen(process.env.PORT, () => console.log("Listening routes"));
