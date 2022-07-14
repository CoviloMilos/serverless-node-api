const BlockModel = require("../models/block")
const response = require("../models/response");
let {counter} = require("../counter");


const getBlocks = async (event, context, callback) => {  
    counter++;
    console.log("GetBlocks Counter: " + counter);  
    // await dbConnection();
    const blocks = await BlockModel.find();
    return response(200, blocks);
}

const getBlockByHash = async (event, context, callback) => {
    // await dbConnection();
    const blockHash = event.pathParameters.hash;

    const block = await BlockModel.findOne({blockHash});

    if (!block) return response(404, {message: "Block not found"});

    return response(200, block);
}

module.exports = {
    getBlocks,
    getBlockByHash
}