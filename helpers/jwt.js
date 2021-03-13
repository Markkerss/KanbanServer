const jwt = require('jsonwebtoken');
const signToken = (id, email) => {
    return jwt.sign({id, email}, process.env.JWT_SECRET);
}

const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.JWT_SECRET);
}

module.exports = { signToken, verifyToken };