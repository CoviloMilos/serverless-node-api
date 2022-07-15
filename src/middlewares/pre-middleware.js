const { dbConnection } = require('../db')
const {performance} = require('perf_hooks');

module.exports.dbConnect = async (event, context, callback) => {
    const start = performance.now();
    event["start"] = start;

    await dbConnection();

    const end = performance.now();

    console.log(`DB CONNECTION: ${end - start}`);
    
}