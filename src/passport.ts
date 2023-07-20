import  { Strategy as GoogleStrategy } from "passport-google-oauth20"
import passport from "passport"

passport.use(
  new GoogleStrategy({
    clientID: process.env.CLIENT_ID as string,
    clientSecret: process.env.CLIENT_SECRET as string,
    callbackURL: "/auth/google/callback",
    scope: ["profile", "email"],
  },
  function (accessToken, refreshToken, profile, callback) {
    callback(null, profile)
  })
)

passport.serializeUser((user, done) => {
  done(null, user)
})

passport.deserializeUser((user, done) => {
  done(null, user as any)
})
