var router = require("express").Router();
const SurveyProtocol = require('../models/SurveyProtocol')

// Get all survey Protocols
router.get("/", (req, res, next) => {
    SurveyProtocol.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving Survey Protocols."
        });
    });
});


module.exports = router;