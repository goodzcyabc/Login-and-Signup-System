const express = require("express")
const router = express.Router()
const validator = require("validator")
const isEmpty = require("lodash/isEmpty")
const sqlFn = require("./config")
const url = require("url")
const jwt = require("jsonwebtoken")
const key = require("./secretKey")

const validatorInput = (data) => {
    /**
     * validator.isEmpty:
     *  determine where a string is null
     */
    let errors = {}
    if (validator.isEmpty(data.username)) {
        errors.username = "Username cannot be empty!"
    }
    if (!validator.isEmail(data.email)) {
        errors.email = "Not in email format!"
    }
    if (validator.isEmpty(data.password)) {
        errors.password = "Password cannot be empty!"
    }
    if (!validator.equals(data.password, data.passwordConfirmation)) {
        errors.passwordConfirmation = "The password and confirmation you typed do not match!"
    }

    return {
        isValid: !isEmpty(errors),
        errors
    }
}

/**
 * isValid: true <=> errors: {}
 * isValid: false <=> errors: { username, ... }
 */


router.post("/register", (req, res) => {
    const { isValid, errors } = validatorInput(req.body)
    if (isValid) {
        res.send({
            errors,
            status: 400
        })
    } else {
        const { username, email, password } = req.body
        const sql = "INSERT INTO user VALUES (null, ?, ?, ?);"
        const arr = [username, password, email]
        sqlFn(sql, arr, result => {
            if (result.affectedRows > 0) {
                res.send({
                    msg: "Successfully registered",
                    status: 200
                })
            } else {
                res.status(401).send({
                    msg: "Registration failed",
                    status: 401
                })
            }
        })
    }
})

router.get("/repeat/username", (req, res) => {
    const username = url.parse(req.url, true).query.username
    const sql = "SELECT * FROM user WHERE username=?"
    const arr = [username]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            res.send({
                status: 200,
                msg: "Username repitition",
                flag: false
            })
        } else {
            res.send({
                status: 200,
                msg: "Username available",
                flag: true
            })
        }
    })
})

router.post("/login", (req, res) => {
    const username = req.body.username
    const password = req.body.password
    const sql = "SELECT * FROM user WHERE username=? AND password=?"
    const arr = [username, password]
    sqlFn(sql, arr, result => {
        if (result.length > 0) {
            const token = jwt.sign({
                uid: result[0].id,
                username: result[0].username
            }, key.secretKey)
            res.send({
                token,
                nick: result[0].username,
                status: 200
            })
        } else {
            res.send({
                status: 400,
                msg: "Username or password is incorrect"
            })
        }
    })
})

router.get("/list", (req, res) => {
    const token = req.headers.authorization
    if (token) {
        res.send({
            list: [
                {
                    id: 1001,
                    name: 'test1'
                },
                {
                    id: 1002,
                    name: 'test2'
                }
            ],
            status: 200
        })
    } else {
        res.send({
            status: 401,
            msg: "Please login first!"
        })
    }
})

module.exports = router