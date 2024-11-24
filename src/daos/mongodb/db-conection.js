import { connect } from 'mongoose';
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
        console.log('MongoDB connection established successfully.');
    } catch (error) {
        throw new Error(error);
    }
};