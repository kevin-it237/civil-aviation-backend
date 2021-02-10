var router = require("express").Router();
const Organisations = require('../models/Organisation')

// Get all organisations
router.get("/", (req, res, next) => {
    Organisations.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Survey Organisations."
        });
    });
});


module.exports = router;