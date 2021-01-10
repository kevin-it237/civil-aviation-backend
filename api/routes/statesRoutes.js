var router = require("express").Router();
const State = require('../models/State')

// Create a new Tutorial
router.get("/", (req, res, next) => {
    State.getAllStates()
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
});

// Get a single KPI for all countries
router.get("/kpis/:kpiId", (req, res, next) => {
    const kpiId = req.params.kpiId

    State.getKPIs(kpiId)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving tutorials."
        });
    });
});

module.exports = router;