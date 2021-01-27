const Sequelize = require("sequelize");
const db = require('./index')

const Organisation = require('./Organisation')
const SurveyProtocol = require('./SurveyProtocol')

const SPResponse = db.sequelize.define("sp_response", {
    questionnaire_response: {
        type: Sequelize.BOOLEAN
    },
    weight_response: { 
        type: Sequelize.FLOAT
    } 
}); 
 
Organisation.belongsToMany(SurveyProtocol, { through: SPResponse });
SurveyProtocol.belongsToMany(Organisation, { through: SPResponse });

module.exports = SPResponse 