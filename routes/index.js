const express = require("express");
const router = express.Router();
const passport = require("passport");


/* ***********************
 * login and logout routes
 * ************************/

router.get("/login", passport.authenticate("github"), () => {});

router.get("/logout", (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
      }
    res.redirect("/");
  });
});

module.exports = router;