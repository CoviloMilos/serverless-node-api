const { dbConnection } = require('../db')
let {counter} = require("../counter");
module.exports.dbConnect = async (event, context, callback) => {
    await dbConnection();
    counter++;
    console.log("Middleware Counter " + counter);
}