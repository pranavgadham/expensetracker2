import redis from "redis";
import dotenv from "dotenv";

const client = redis.createClient({
    url: process.env.REDIS_URL
});

client.on('error', (err) => {
    console.error('Redis Client Error:', err);
});

const connectRedis = async () => {
    try {
        await client.connect();
        console.log('Connected to Redis');
    } catch (err) {
        console.error('Failed to connect to Redis:', err);
        process.exit(1);
    }
};

export { client, connectRedis };