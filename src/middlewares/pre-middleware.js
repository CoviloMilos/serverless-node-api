const dbConnection = require('../db')

module.exports.dbConnect = async (event, context, callback) => {
    await dbConnection();
}