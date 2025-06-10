import { Router } from "express";
import ExpenseController from "./expense.controller.js";

const expenseRoutes = Router();
const controller = new ExpenseController();

expenseRoutes.post("/create", controller.add);
expenseRoutes.get("/all", controller.getPages);
expenseRoutes.get("/getOne/:id", controller.getOne);

export default expenseRoutes;
