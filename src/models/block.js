const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const BlockSchema = new mongoose.Schema({  
    blockHash: String,
    blockNumber: Number,
    blockNumberL2: Number,
    leafCount: Number,
    nCommitments: Number,
    previousBlockHash: String,
    proposer: String,
    root: String,
    transactionHashL1: String,
    transactionHashes: [String],
    transactionHashesRoot: String
});

module.exports = mongoose.models.blocks ||  mongoose.model("blocks", BlockSchema);
