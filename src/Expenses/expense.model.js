import ExpenseModel from "./expense.schema.js";


class expenseModel {

  addExpense = async ({ name, amount, date },userId) =>{
    try{
      const newExpense = await new ExpenseModel({
        name: name,
        amount: amount,
        date: date,
        userId: userId
      });
      return await newExpense.save();
    }catch(err){
      throw new Error("Error adding expense: " + err.message);
    }
  }

  
  getAllExpenses = async (userId) => {
    try{
      const expenses = await ExpenseModel.find({userId: userId});
      return expenses;
    }
    catch(err){
      throw new Error("Error retrieving expenses: " + err.message);
    }
  }
  
  async getOne(id,userId) {
    try {
      const expense = await ExpenseModel.find({_id:id, userId: userId});
      return expense;
    } catch (error) {
      throw new Error("Error retrieving expense: " + error.message);
    }
  }

}

export default expenseModel;
