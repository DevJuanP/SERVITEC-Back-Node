import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './config/db.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer()

export default app