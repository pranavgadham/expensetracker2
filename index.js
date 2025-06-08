import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from "cookie-parser";
import userRoutes from './src/Users/user.route.js';
import jwtAuth from './src/middleware/jwt.auth.js';
import expnseRoutes from './src/Expenses/expenses.routes.js';



dotenv.config();
const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cookieParser());

app.use('/api/users',userRoutes);
app.use('/api/expenses', jwtAuth, expnseRoutes);


export default app;