var router = require("express").Router();
const State = require('../models/State')

// Create a new Tutorial
router.get("/", (req, res, next) => {
    State.getAllStates()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
});


module.exports = router;