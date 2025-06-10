import expenseModel from "./expense.model.js";
import { client as redisClient } from "../config/redis.config.js";
import { request } from "express";

const model = new expenseModel();

export default class ExpenseController {
  add = async (req, res) => {
    try {
      const { name, amount, date } = req.body;
      const userId = req.user.userId;
      if (!name || !amount || !date) {
        return res.send({
          success: false,
          message: "name, amount, and date are required",
        });
      }
      const result = await model.addExpense({ name, amount, date }, userId);
      if (!result) {
        return res.send({ success: false, message: "Error creating expense." });
      }
      res.send({ success: true, message: "Expense created successfully" });
    } catch (err) {
      res.send({ success: false, message: "Error creating expense." });
    }
  };

  getOne = async (req, res) => {
    try {
      const { id } = req.params;
      const userId = req.user.userId;

      const cashKey = id;
      const cashedExpense = await redisClient.get(cashKey);
      if (cashedExpense) {
        return res.send({ success: true, data: JSON.parse(cashedExpense) });
      }

      const expense = await model.getOne(id, userId);

      if (!expense) {
        return res.send({ success: false, message: "Expense not found" });
      }

      await redisClient.set(cashKey, JSON.stringify(expense), { EX: 3600 });
      res.send({ success: true, data: expense });
    } catch (err) {
      res.send({ success: false, message: "Error retrieving expense" });
    }
  };

  getPages = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 5;
      const userId = req.user.userId;

      const filters = { userId: userId };
      if (req.query.name) {
        filters.name = { $regex: req.query.name, $options: "i" };
      }

      const sort = {};
      if (req.query.sortBy === "amount") {
        sort.amount = 1;
      } else if (req.query.sortBy === "date") {
        sort.date = -1;
      }

      const result = await model.queryExpenses({
        userId,
        filters,
        sort,
        page,
        limit,
      });

      res.send({
        success: true,
        data: result.expenses,
        pagination: result.pagination,
      });
    } catch (error) {
      console.log(error);
      res.send({ success: false, message: "Error retrieving expense" });
    }
  };
}
