require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const inventoryRoute = require("./routes/inventoryRoute");
const accountRoute = require("./routes/accountRoute");
const route = require("./routes/index");
const PORT = process.env.PORT;
const passport = require("passport");
const session = require("express-session");
const GithubStrategy = require("passport-github2").Strategy;
const swaggerUi = require("swagger-ui-express");
const swaggerDocument = require("./swagger.json");


/* ***********************
 * Middleware
 * ************************/

app
  .use(
    session({
      secret: "secret",
      resave: false,
      saveUninitiated: true,
    })
  )
  .use(passport.initialize())
  .use(passport.session())
  .use(bodyParser.json());

  passport.use(
    new GithubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL,
      },
      (accessToken, refreshToken, profile, done) => {
        return done(null, profile);
      }
    )
  );
  
  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });
  
/* ***********************
 * Routes
 *************************/

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument))
.use("/inv", inventoryRoute)
.use("/account", accountRoute)
.use("/", route);

app.get("/", (req, res) => {
  res.send(
    req.session.user !== undefined
      ? `Logged in as ${req.session.user.displayName}`
      : "Logged Out"
  );
});

app.get(
  "/auth/github/callback",
  passport.authenticate("github", {
    failureRedirect: "/api-docs",
    session: false,
  }),
  (req, res) => {
    req.session.user = req.user;
    res.redirect("/");
  }
);

// File Not Found Route
app.use(async (req, res, next) => {
  next({ status: 404, message: "Sorry, we appear to have lost that page." });
});


app.listen(PORT, () => {
  console.log(`Web service is listening on port: ${PORT}.`);
});
