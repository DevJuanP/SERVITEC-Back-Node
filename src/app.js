import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'

import { connectDB } from './config/db.js'

import authRoutes from './routes/authRoutes.js'
import productoRoutes from './routes/productoRoutes.js'
import userRoutes from './routes/userRoutes.js'
import citasRoutes from './routes/citasRoutes.js'
import { cargarUsers } from './utils/seeder.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200
}

app.use(cors(corsOptions))
app.use(express.json())

app.use('/api/auth', authRoutes)
app.use('/api/productos', productoRoutes)
app.use('/api/user', userRoutes)
app.use('/api/cita', citasRoutes)

app.get('/', (req, res) => {
    res.send('Hello World!')
})

const startServer = async () => {
    try {
        await connectDB();

        app.listen(PORT, async () => {
            console.log(`Server running on port ${PORT}`);
            console.log('Cargando usuarios, clientes y asesores...')
            await cargarUsers()
            console.log('Base de datos lista para usar!')
        });
    } catch (error) {
        console.error('Error starting server:', error);
    }
}

startServer()

export default app