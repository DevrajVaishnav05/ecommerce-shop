const jwt = require('jsonwebtoken');
const generateToken = (user) => {
    try {
        return jwt.sign(
            { email: user.email, id: user._id },
            process.env.JWT_KEY,  
        );
    } catch (err) {
        console.error("Error generating token:", err);
        throw new Error("Failed to generate JWT token.");
    }
}

module.exports.generateToken = generateToken;
