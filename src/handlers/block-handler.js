const BlockModel = require("../models/block")
const response = require("../models/response");
const {performance} = require('perf_hooks');

const getBlocks = async (event, context, callback) => {  
    // await dbConnection();
    const start = performance.now();

    const blocks = await BlockModel.find();

    const end = performance.now();

    console.log(`DB BLOCK.FINDALL: ${end - start}`);
    console.log(`END: ${end - event["start"]}`)
    return response(200, blocks);
}

const getBlockByHash = async (event, context, callback) => {
    // await dbConnection();
    const blockHash = event.pathParameters.hash;

    const block = await BlockModel.findOne({blockHash});

    if (!block) return response(404, {message: "Block not found"});

    return response(200, block);
}

const getBlocksPaginated = async (event, context, callback) => {
    const { page } = event.queryStringParameters
    const perPage = 20;

    const blocks = await BlockModel.find().limit(perPage).skip(perPage * page)

    return response(200, blocks);
}

const healthCheck = async () => {
    return response(200, {message: "It's healthy"});
}

module.exports = {
    getBlocks,
    getBlockByHash,
    healthCheck,
    getBlocksPaginated
}