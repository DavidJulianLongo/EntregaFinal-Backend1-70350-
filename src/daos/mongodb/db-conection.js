import { connect } from 'mongoose';
import 'dotenv/config';

const MONGO_URL = process.env.MONGO_URL;

export const initMongoDB = async () => {
    try {
        await connect(MONGO_URL);
        const db = await connect(MONGO_URL);
        console.log('Conexión a la base de datos:', db.connection.name);
    } catch (error) {
        throw new Error(error);
    }
};