var router = require("express").Router();
const db = require('../models')
const { QueryTypes } = db.Sequelize;
const Op = db.Sequelize.Op

const SurveyProtocol = require('../models/SurveyProtocol')
const Organisation = require('../models/Organisation')
const YDMS_KPIs = require('../models/YDMS_KPIs')

// Get a single KPI
router.get("/:kpiId", (req, res, next) => {
    const kpiId = req.params.kpiId

    const queryPromise = 
    db.sequelize.query(
        'SELECT states.country_code, organisations.short_name, organisations.YDMS_Org_id, SUM(sp_responses.weigth) as totalweight, SUM(sp_responses.questionnaire_response) as response, SUM((CASE WHEN sp_responses.questionnaire_response > 0 THEN sp_responses.weigth ELSE 0 END)) as weight FROM `survey_protocols`, `organisations`, `sp_responses`, `states` WHERE survey_protocols.YDMSKPIYDMSKPIsId=? AND sp_responses.organisationYDMSOrgId=organisations.YDMS_Org_id AND states.YDMS_AU_id=organisations.YDMS_Org_id AND sp_responses.surveyProtocolYDMSSPId=survey_protocols.YDMS_SP_id GROUP BY organisations.YDMS_Org_id',
        {
          replacements: [kpiId],
          type: QueryTypes.SELECT
        }
    );

    queryPromise
    .then(data => {
        console.log(data)
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Some error occurred while retrieving KPIs datas."
        });
    });
    // SurveyProtocol.findAll({ 
    //     // attributes: ['YDMS_SP_id', 'YDMSKPIYDMSKPIsId'],
    //     include: {
    //         model: Organisation,
    //     },
    //     where: {
    //         YDMSKPIYDMSKPIsId: {
    //             [Op.eq]: kpiId
    //         }
    //     }
    // })
    // .then(data => {
    //     res.send(data);
    // })
    // .catch(err => {
    //     res.status(500).send({
    //       message:
    //         err.message || "Some error occurred while retrieving tutorials."
    //     });
    // });
});

// KPIs listing
router.get("/org/:type", (req, res, next) => {
    const type = req.params.type

    YDMS_KPIs.findAll({ 
        where: {
            KPIs_org_type: {
                [Op.eq]: type
            }
        },
        order: [
            ['YDMS_KPIs_id', 'ASC'],
        ],
    })
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
          message:
            err.message || "Some error occurred while retrieving datas"
        });
    });
});

module.exports = router;