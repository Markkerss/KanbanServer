const jwt = require('jsonwebtoken');
console.log(process.env.SECRET)
const signToken = (id, email) => {
    return jwt.sign({id, email}, process.env.SECRET);
}

const verifyToken = (access_token) => {
    return jwt.verify(access_token, process.env.SECRET);
}

module.exports = { signToken, verifyToken };