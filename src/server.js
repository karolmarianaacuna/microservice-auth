import express from 'express';
import authRoutes  from './routes/auth.routes.js'
import dotevn from 'dotenv';

dotevn.config();

const app = express();
app.use(express.json());


app.use("/api/auth", authRoutes);


app.listen(process.env.PORT, ()=>{
    console.log("Servidor corriendo en puerto", process.env.PORT);
})

export default app;