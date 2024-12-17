const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
const ownerModel = require("../models/ownerModel"); // Ensure this path is correct
const {generateToken} = require('../utils/generateToken');
const ownerLoggedln = require("../middlewares/ownerLoggedln"); 


router.get('/login', async function (req, res) {
    try {
        const owner = await ownerModel.find(); 
        if (owner.length === 0) {  
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash('1', salt); 
            
            const user = new ownerModel({
                fullname: 'devraj',
                email: 'devraj@gmail.com',
                password: hashedPassword 
            });

            await user.save(); // Save the new user to the database
        }
        
        // Render the admin login page
        res.render('adminlogin');
        
    } catch (error) {
        res.redirect("/test");
    }
});


// POST /login
router.post('/login', async function (req, res) {
    try {
        const { email, password } = req.body;
        const user = await ownerModel.findOne({ email });
       
        if (!user) return res.redirect('/');
        bcrypt.compare(password, user.password, function (err, isMatch) {
            const token = generateToken(user);
            res.cookie("token", token);
            return res.redirect("/owners/index");
        });
    } catch (error) {
        res.status(500).send('Server error');
    }
});
router.get('/logout',  function (req, res) {
    res.clearCookie('token');
    res.redirect('/');
});
router.get("/index" ,ownerLoggedln,  function (req, res) {
    res.render('owner/index');
 });
 

module.exports = router;
