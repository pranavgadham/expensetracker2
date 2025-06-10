import ExpenseModel from "./expense.schema.js";

class expenseModel {
  addExpense = async ({ name, amount, date }, userId) => {
    try {
      const newExpense = await new ExpenseModel({
        name: name,
        amount: amount,
        date: date,
        userId: userId,
      });
      return await newExpense.save();
    } catch (err) {
      throw new Error("Error adding expense: " + err.message);
    }
  };

  getOne = async (id, userId) => {
    try {
      const expense = await ExpenseModel.find({ _id: id, userId: userId });
      return expense;
    } catch (error) {
      throw new Error("Error retrieving expense: " + error.message);
    }
  };

  queryExpenses = async ({ userId, filters = {}, sort = {}, page = 1, limit = 10 }) => {
    try {
        const startIndex = (page - 1) * limit;

        const expenses = await ExpenseModel.find(filters)
            .sort(sort)
            .skip(startIndex)
            .limit(limit);

        const totalItems = await ExpenseModel.countDocuments(filters);

        return {
            expenses,
            pagination: {
                currentPage: page,
                totalPages: Math.ceil(totalItems / limit),
                totalItems,
            },
        };
    } catch (err) {
        throw new Error("Error querying expenses: " + err.message);
    }
};
}

export default expenseModel;
