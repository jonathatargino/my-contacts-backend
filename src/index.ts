import "dotenv/config"
import "express-async-errors"
import "./passport"

import express from "express"
import cors from "cors"
import passport from "passport"
import cookieSession from "cookie-session"

import authHandler from "./app/middlewares/authHandler"
import errorHandler from "./app/middlewares/errorHandler"
import routes from "./routes"
import authRoutes from "./routes/authRoutes"

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
