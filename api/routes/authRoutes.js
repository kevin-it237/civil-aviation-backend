var router = require("express").Router();
const { verifySignUp } = require("../middleware");
const User = require('../models/User')
const Sequelize = require('sequelize')
const config = require('../../config/auth.config')

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

router.post("/register", verifySignUp.checkDuplicateUsernameOrEmail, (req, res) => {
    // Save User to Database
    User.create({
        username: req.body.username,
        email: req.body.email,
        role: "user",
        password: bcrypt.hashSync(req.body.password, 8)
    })
    .then(user => {
        res.status(200).send({ 
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
            message: "User was registered successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

router.post("/signin", (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    })
    .then(user => {
        if (!user) {
            return res.status(404).send({ message: "User Not found." });
        }

        var passwordIsValid = bcrypt.compareSync(
            req.body.password,
            user.password
        );

        if (!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: "Invalid Password!"
            });
        }

        var token = jwt.sign({ id: user.id }, config.secret, {
            expiresIn: 86400*365 // one year
        });

        res.status(200).send({
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            accessToken: token,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt,
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

module.exports = router;