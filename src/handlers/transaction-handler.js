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


module.exports = {
    getTransactions,
    getTransactionByHash
}