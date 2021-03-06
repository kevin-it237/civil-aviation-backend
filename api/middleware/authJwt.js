const jwt = require("jsonwebtoken");
const config = require("../../config/auth.config");
const User = require('../models/User')

verifyToken = (req, res, next) => {
    let token = req.headers.authorization.split(' ')[1];
    let orgId = req.headers.orgid;

    if (!token) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    jwt.verify(token, config.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                message: "Unauthorized! Invalid token"
            });
        }
        req.userId = decoded.id;
        req.role = decoded.role;
        req.orgId = orgId;
        next();
    });
};

isAdmin = (req, res, next) => {
    User.findByPk(req.userId).then(user => {

        if (user.role === "admin") {
            next();
            return;
        }

        res.status(403).send({
            message: "Require Admin Role!"
        });
        return;
  });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};
module.exports = authJwt;