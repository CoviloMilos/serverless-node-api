const TransactionModel = require("../models/transaction")
const response = require("../models/response");

const getTransactions = async (event, context, callback) => {    
    // await dbConnection();
    const transactions = await TransactionModel.find();

    return response(200, transactions);
}

const getTransactionByHash = async (event, context, callback) => {
    // await dbConnection();
    const transactionHash = event.pathParameters.hash;

    const transaction = await TransactionModel.findOne({transactionHash});

    if (!transaction) return response(404, {message: "transaction not found"});

    return response(200, transaction);
}

const getTransactionsPaginated = async (event, context, callback) => {
    const { page } = event.queryStringParameters
    const perPage = 20;

    const txs = await TransactionModel.find().limit(perPage).skip(perPage * page)

    return response(200, txs);
}

module.exports = {
    getTransactions,
    getTransactionByHash,
    getTransactionsPaginated
}