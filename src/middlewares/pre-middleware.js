const { dbConnection } = require('../db')
const {performance} = require('perf_hooks');

module.exports.dbConnect = async (event, context, callback) => {
    if (event.source == 'serverless-plugin-warmup') {
        console.log("WARMUP");
        /** Slightly delayed (25ms) response 
    	to ensure concurrent invocation */
        await new Promise(r => setTimeout(r, 25));
        return {
            statusCode: 200,
            body: JSON.stringify({})
        }
    }
    const start = performance.now();
    event["start"] = start;

    console.log(JSON.stringify(event, null, 4))

    if (event.requestContext.path !== "/health") {
        try {
            await dbConnection();
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: JSON.stringify(error)
            }
        }
    
        const end = performance.now();
    
        console.log(`DB CONNECTION: ${end - start}`);
    }
    
}