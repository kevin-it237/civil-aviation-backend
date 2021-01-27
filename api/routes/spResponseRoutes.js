var router = require("express").Router();
const SPResponse = require('../models/SP_Response')

// Save question response
router.post("/", (req, res, next) => {

    if (!req.body.YDMS_Org_id) {
        return res.status(401).send({
            message: "YDMS_Org_id field not found!"
        });
    }
    if(req.body.YDMS_SP_id) {
        return res.status(401).send({
            message: "YDMS_SP_id field not found!"
        });
    }
    if(req.body.response) {
        return res.status(401).send({
            message: "response field not found!"
        });
    }

    const response = {
        organisationYDMSOrgId: req.body.YDMS_Org_id,
        surveyProtocolYDMSSPId: req.body.YDMS_SP_id,
        questionnaire_response: req.body.response,
        weight_response: req.body.weight ? req.body.weight : 0
    }

    SPResponse.create(response)
    .then(response => {
        res.status(200).send({ 
            ...response,
            message: "Response saved successfully!" });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
});

module.exports = router;