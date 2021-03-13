const { verifyToken } = require('../helpers/jwt');
const { User, Task } = require('../models');

function authenticate (req, res, next) {
    try {
        let isUser = verifyToken(req.headers.access_token);
        User.findByPk(isUser.id)
        .then(data => {
            if (!data) {
                next({code: 404, message: 'User not found'});
            } else {
                req.currentUser = {id: data.id, email: data.email};
                next();
            }
        })
    } catch (err) {
        next({code: 403, message: "Please login"});
    }
}

function authorize (req, res, next) {
    let id = +req.params.id
    Task.findByPk(id)
    .then(data => {
        if (!data) {
            next({code: 404, message: 'Resource not found'})
        } else if (data.UserId === req.currentUser.id) {
            next();
        } else {
            next({code: 403, message: "Access Denied"});
        }
    })
    .catch(err => {
        next({code: 403, message: "Access Denied"});
    })
}

module.exports = { authenticate, authorize };