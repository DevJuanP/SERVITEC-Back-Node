import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config()

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017';
const dbName = process.env.DB_NAME || 'servitec';

const client = new MongoClient(url, /*{ useNewUrlParser: true, useUnifiedTopology: true }*/);

let db = null;

export const connectDB = async () => {
    if (db) return db;
    try {
        console.log('Connecting to MongoDB...');
        await client.connect();
        db = client.db(dbName);
        console.log('Connected to MongoDB successfully');
        return db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

export const getDB = () => {
    if (!db) {
        throw new Error('DB no inicializada. Llama a connectDB() primero.');
    }
}



