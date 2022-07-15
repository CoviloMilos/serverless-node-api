const BlockModel = require("../models/block")
const TransactionModel = require("../models/transaction")
const response = require("../models/response");

const searchByHash = async hash => {
    const blockPromise = BlockModel.findOne({blockHash: hash});
    const txPromise = TransactionModel.findOne({transactionHash: hash})

    const result = await Promise.allSettled([blockPromise, txPromise])
    const value = result.filter((promise) => promise.status === "fulfilled").map((promise) => promise.value).filter(v => !!v);

    if (value.length === 0) return response(404, {message: "Not found"})
    return value[0]
}

const getBlockByBlockNumber = async blockNumber => {
    const block = await BlockModel.findOne({blockNumber});

    if (!block) return response(404, {message: "Not found"})

    return block
}

const plainSearch = async (event, context, callback) => {
    const { q } = event.queryStringParameters

    if (!q) return response(400, {message: "Bad request"})

    let isHash = false;
    let isBlockNumber = false;

    if (/^0x([A-Fa-f0-9]{64})$/.test(q)) isHash = true;
    else if (!isNaN(q)) isBlockNumber = true;

    if (isBlockNumber) { // Block number can become very high!
        const block = await getBlockByBlockNumber(Number(q));
        return response(200, block);
    }

    if (isHash) {
        const res = await searchByHash(q);
        return response(200, res);
    }

    return response(400, {message: "Bad request"});
}

module.exports = {
    plainSearch
}