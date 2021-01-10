const localDB = "mongodb://localhost/surveycmr";
const liveDB = "mongodb://admin:admin5@ds329668.mlab.com:29668/surveycmr"

module.exports = {
    HOST: "localhost",
    USER: "root",
    PASSWORD: "",
    DB: "civil-aviation-db",
    dialect: "mysql",
    operatorsAliases: false,
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
};

// module.exports = {
//     database: process.env.NODE_ENV !== 'production' ? localDB : liveDB
// }