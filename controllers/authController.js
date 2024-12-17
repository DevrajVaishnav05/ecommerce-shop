const userModel = require('../models/userModel')
const bcrypt = require('bcrypt');
const {generateToken} = require('../utils/generateToken');
module.exports.registerUser = async function(req, res){
try {
    const { fullname, email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await userModel.create({
        fullname,
        email,
        password: hashedPassword
    });
    
    const token = generateToken(user);
    res.cookie("token", token);
    res.redirect("/users/index");
} catch (err) {
    console.error("Error creating user:", err);
    res.status(500).send("Internal server error.");
}
}
module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;

        // Find user by email
        let user = await userModel.findOne({ email });
        if (!user) return res.status(404).send("User does not exist");

        // Compare the passwords
        bcrypt.compare(password, user.password, function(err, isMatch) {
            
            if (isMatch) {
                // Generate token if password matches
                const token = generateToken(user);
                res.cookie("token", token);
                return res.redirect("/users/index");
            }
        });
    } catch (err) {
        console.error("Error logging in user:", err);
        res.status(500).send("Internal server error.");
    }
}

module.exports.logout = async function(req, res) {
    res.clearCookie('token');
    res.redirect('/');
};