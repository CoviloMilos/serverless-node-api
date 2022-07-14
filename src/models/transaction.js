const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const TransactionSchema = new mongoose.Schema({  
    transactionHash: String,
    blockNumber: Number,
    blockNumberL2: Number,
    commitments: [String],
    compressedSecrets: [String],
    ercAddress: String,
    fee: Number,
    historicRootBlockNumberL2: [String],
    mempool: Boolean,
    nullifiers: [String],
    proof: [String],
    recipientAddress: String,
    tokenId: String,
    tokenType: String,
    transactionHashL1: String,
    transactionType: String,
    value: String,
});

module.exports = mongoose.models.transactions ||  mongoose.model("transactions", TransactionSchema);
