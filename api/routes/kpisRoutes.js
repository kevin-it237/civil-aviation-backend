var router = require("express").Router();

const Op = require('sequelize').Op

const SurveyProtocol = require('../models/SurveyProtocol')
const Organisation = require('../models/Organisation')

// Get a single KPI
router.get("/:kpiId", (req, res, next) => {
    const kpiId = req.params.kpiId

    SurveyProtocol.findAll({ 
        include: {
            model: Organisation,
        },
        where: {
            YDMSKPIYDMSKPIsId: {
                [Op.eq]: kpiId
            }
        }
    })
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