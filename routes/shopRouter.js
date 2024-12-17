const express = require('express');
const router = express.Router();
const isLoggedin = require("../middlewares/isLoggedln");  // Ensure the middleware is correct

// Home route - render the homepage view
router.get("/", function(req, res) {
    // Retrieving flash messages
    let error = req.flash('error');
    res.render('index', { error });  // Send error messages to the template if any
});

router.get("/index", function(req, res) {
    res.render('shop/index');
});
module.exports = router;
