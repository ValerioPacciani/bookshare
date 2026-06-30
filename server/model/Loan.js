const mongoose = require("mongoose");
const loanSchema = new mongoose.Schema(
  {
    confirmedByReciever: {
      type: Boolean,
      required: true,
      default: false,
    },
    confirmedBySender: {
      type: Boolean,
      required: true,
      default: false,
    },

    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    bookId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Book",
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "accepted", "refused", "returned"],
      default: "pending",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Loan", loanSchema);
