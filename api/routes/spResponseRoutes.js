var router = require("express").Router();
const SPResponse = require('../models/SP_Response')
const SurveyProtocol = require('../models/SurveyProtocol')
const Organisation = require('../models/Organisation')

// Save question response
router.post("/", (req, res, next) => {
    if (!req.body.YDMS_Org_id) {
        return res.status(401).send({
            message: "YDMS_Org_id field not found!"
        });
    }

    if(!req.body.YDMS_SP_id) {
        return res.status(401).send({
            message: "YDMS_SP_id field not found!"
        });
    }
    if(!req.body.response.toString().length) {
        return res.status(401).send({
            message: "response field not found!"
        });
    }

    const response = {
        organisationYDMSOrgId: req.body.YDMS_Org_id,
        surveyProtocolYDMSSPId: req.body.YDMS_SP_id,
        questionnaire_response: req.body.response,
        weight_response: req.body.weight ? req.body.weight : 0,
        kpi_id: req.body.kpi
    }

    // Check if question is already anwsered
    SPResponse.findOne({
        where: {
            organisationYDMSOrgId: req.body.YDMS_Org_id,
            surveyProtocolYDMSSPId: req.body.YDMS_SP_id
        }
    }).then(resp => {
        if (resp) {
            res.status(400).send({
                message: "This organisation has already anwsered this question!"
            });
            return;
        } else {
            // Save the response
            SPResponse.create(response)
            .then(response => {
                res.status(200).send({ 
                    data: response,
                    message: "Response saved successfully!" });
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
        }
    });
});

// Questions anwsered by an org
router.get("/:orgId", (req, res, next) => {

    const orgId = req.params.orgId
    
    SPResponse.findAll({
        where: {
            organisationYDMSOrgId: orgId
        }
    }).then(responses => {
        return res.status(201).send(responses);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

// Questions and responses by an org
router.get("/questions/:orgId", (req, res, next) => {

    const orgId = req.params.orgId
    
    Organisation.findOne({
        attributes: ['YDMS_Org_id', 'short_name'],
        where: {
            YDMS_Org_id: orgId
        },
        include: [
            {
                model: SurveyProtocol,
                attributes: ['YDMS_SP_id', 'ydmsKpiYDMSKPIsId', 'questionnaire_text', 'YDMS_Inst_id', 'provision_id'],
            }
        ],
    }).then(responses => {
        return res.status(201).send(responses);
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

module.exports = router;