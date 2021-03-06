var router = require("express").Router();
const Definition = require('../models/Definition')
const Article = require('../models/Article')
const Provision = require('../models/Provision');
const Instrument = require("../models/Instrument");
const db = require('../models')
const Op = db.Sequelize.Op

// Get all definitions
router.get("/definitions", (req, res, next) => {
    Definition.findAll()
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving definitions."
        });
    });
});

// Get all instruments, articles, and provision
router.get("/instruments", (req, res, next) => {
    Instrument.findAll({
        include: [
            {
                model: Article,
                where: {},
                include: [
                    {
                        model: Provision,
                        where: {}
                    },
                ]
            },
        ],
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving definitions."
        });
    });
});

// Get all instruments, articles, and provision
router.get("/provision/:instId/:provisionNumber", (req, res, next) => {
    const provisionNumber = req.params.provisionNumber
    const instId = req.params.instId
    
    Provision.findOne({
        where: {
            provision_number: {
                [Op.eq]: provisionNumber
            }
        },
        include: [
            {
                model: Article,
                include: [
                    {
                        model: Instrument,
                        where: {
                            YDMS_Inst_id: {
                                [Op.eq]: instId
                            }
                        }
                    }
                ]
            },
        ],
    })
    .then(data => {
        res.status(200).send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving definitions."
        });
    });
});

module.exports = router;