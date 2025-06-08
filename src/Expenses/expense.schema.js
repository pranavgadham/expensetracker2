import mongoose, { mongo } from "mongoose";

const ExpenseSchema = mongoose.Schema({
  name:{
    type: String,
    required: true
  },
  amount:{
    type: Number,
    required: true
  },
  date:{
    type: Date,
    required: true
  },
  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
})

const ExpenseModel = mongoose.model("ExpenseTracker", ExpenseSchema);
export default ExpenseModel;