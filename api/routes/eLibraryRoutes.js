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
router.get("/article/:articleId", (req, res, next) => {
    let articleId = req.params.articleId
    Article.findOne({
        where: {
            YDMS_Art_id: {
                [Op.eq]: articleId
            }
        },
        include: [
            {
                model: Provision,
                where: {}
            },
            {
                model: Instrument,
                where: {}
            }
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