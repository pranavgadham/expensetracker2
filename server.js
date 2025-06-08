import app from './index.js';
import connectDB from './src/config/mongo.config.js';
import { connectRedis } from './src/config/redis.config.js';

app.listen(process.env.PORT,async () => {
    console.log(`Server is running on port ${process.env.PORT}`);
    await connectDB();
    await connectRedis();
})