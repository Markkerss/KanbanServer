const { signToken } = require('../helpers/jwt')
const { checkPass } = require('../helpers/passwordHelper')
const { User } = require('../models')

class UserController {
    static login (req, res, next) {
        let email = req.body.email
        let password = req.body.password
        User.findOne({where: {email}})
            .then(data => {
                if (!data) {
                    next({code: 400, message: 'Invalid email/password'})
                } else {
                    let checkPasss = checkPass(password, data.password)
                    if (checkPasss) {
                        let access_token = signToken(data.id, data.email)
                        res.status(200).json({access_token, email: data.email})
                    } else {
                        next({code: 400, message: 'Invalid email/password'})
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static register (req, res, next) {
        let newUser = {
            full_name: req.body.full_name,
            email: req.body.email,
            password: req.body.password
        }

        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id: data.id,
                full_name: data.full_name,
                email: data.email
            })
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = UserController 