# ExpenseTracker

ExpenseTracker is a web application that allows users to manage their expenses. It includes features like user authentication, expense tracking, and pagination for expense records.

## Features

- User authentication with JWT-based login and signup.
- Secure cookie-based session management.
- Add, view, and paginate expense records.
- MongoDB for storing user and expense data.

## Prerequisites

Before setting up the project, make sure you have the following installed:

- [Node.js](https://nodejs.org/en/) (v16.x or higher recommended)
- [MongoDB](https://www.mongodb.com/)
- [Redis](https://redis.io/) (optional, for caching if enabled)

## Setup Procedure

Follow these steps to set up the ExpenseTracker project on your local machine:

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/ExpenseTracker.git
cd ExpenseTracker
```

### 2. Install Dependencies
Install the required packages using npm:

```bash
npm install
```

### 3. Set Up Environment Variables
Create a .env file in the root directory with the following values:

```bash
#.env file
PORT=3000
mongoURL=your_mongo_connection_url
jwtKey=your_jwt_secret_key
REDIS_URL=your_redis_connection_url # Optional, if Redis is used
```

- PORT: The port on which the server will run.
- mongoURL: Your MongoDB connection string, including your database name.
- jwtKey: A secret key for signing JWT tokens.
- REDIS_URL: Redis connection URL (if caching is enabled).

### 4. Run the Application
To start the application in development mode:
```bash
npm run dev
```
## Technologies Used
- Backend: Node.js, Express.js
- Database: MongoDB
- Authentication: JSON Web Tokens (JWT)
- Caching: Redis (optional)

## API Endpoints

### User Routes

- POST /api/users/signup: User signup.
- POST /api/users/login: User login.
- GET /api/users/logout: User logout (requires authentication).

## Expense Routes

- POST /api/expenses/create: Add a new expense (requires authentication).
- GET /api/expenses/all: Get paginated expenses (requires authentication).