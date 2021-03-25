const { signToken } = require('../helpers/jwt')
const { checkPass } = require('../helpers/passwordHelper')
const { User } = require('../models')
const { OAuth2Client } = require('google-auth-library')

class UserController {
    static login (req, res, next) {
        let email = req.body.email
        let password = req.body.password
        console.log(email)
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
            email: req.body.email,
            password: req.body.password
        }
        console.log(newUser)
        User.create(newUser)
        .then(data => {
            res.status(201).json({
                id: data.id,
                email: data.email
            })
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    }

    static googleLogin (req, res, next) {
        const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.GOOGLE_CLIENT_ID,
            })
            const googleUserParams = ticket.getPayload()

            User.findOrCreate({
                where: {
                    email: googleUserParams.email
                },
                defaults: {
                    password: (new Date()).toString()
                }
            })
                .then(user => {
                    const payload = {id: user[0].id, email: user[0].email}
                    res.status(200).json({
                        id: payload.id,
                        email: payload.email,
                        access_token: signToken(payload.id, payload.email)
                    })
                })
                .catch(err => {
                    console.log(err)
                })
        }
        verify().catch(console.error)
    }
}

module.exports = UserController 