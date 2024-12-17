const jwt = require('jsonwebtoken');
const ownerModel = require('../models/ownerModel');

module.exports = async function (req, res, next) {
   
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await ownerModel.findOne({email:decoded.email}).select("-password");
        req.user = user;
        next();
    }catch(err){
        res.redirect('/');

    }
}