const Sequelize = require("sequelize");
const db = require('./index')

const YDMS_KPIs = require('../models/YDMS_KPIs')

const SurveyProtocol = db.sequelize.define("survey_protocol", {
    YDMS_SP_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    questionnaire_label: {
        type: Sequelize.STRING
    },
    questionnaire_text: {
        type: Sequelize.STRING
    },
});

YDMS_KPIs.hasOne(SurveyProtocol);
SurveyProtocol.belongsTo(YDMS_KPIs);

module.exports = SurveyProtocol