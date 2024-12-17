const jwt = require('jsonwebtoken');
const userModel = require('../models/userModel');

module.exports = async function (req, res, next) {
   
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await userModel.findOne({email:decoded.email}).select("-password");
        req.user = user;
        next();
    }catch(err){
        res.redirect('/');

    }
}