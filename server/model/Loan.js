const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema({

    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    bookId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },

    status: {
        type: String,
        enum: ["pending", "accepted", "refused"],
        default: "pending",
        required: true
    }
},
    {
        timestamps: true
    },

);

module.exports = mongoose.model("Loan", loanSchema)