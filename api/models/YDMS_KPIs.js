const Sequelize = require("sequelize");
const db = require('./index')

const YDMS_KPIs = db.sequelize.define("YDMS_KPIs", {
    YDMS_KPIs_id: {
        type: Sequelize.STRING,
        primaryKey: true,
    },
    KPIs_label: {
        type: Sequelize.STRING
    },
    KPIs_text: {
        type: Sequelize.TEXT
    },
    KPIs_org_type: {
        type: Sequelize.STRING 
    },
}); 

module.exports = YDMS_KPIs