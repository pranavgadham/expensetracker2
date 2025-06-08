import { Router } from "express";
import ExpenseController from "./expense.controller.js";

const expnseRoutes = Router();
const controller = new ExpenseController();

expnseRoutes.post("/create", controller.add);
expnseRoutes.get("/all", controller.getAll);
expnseRoutes.get("/getOne/:id", controller.getOne);


export default expnseRoutes;
