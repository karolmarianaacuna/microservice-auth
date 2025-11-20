import { prisma } from "../config/prismaclient.js";
import bcrypt from "bcrypt";

export const newUsers = async(req, res){
     const { name, lastname, email, password, role } = req.body;

     try {
        const hashed = await bcrypt.hash(password,10);
        const user = await prisma.user.create({
            data:{
                name,
                lastname,
                email,
                password : hashed,

                // Si no envían role → será USER automáticamente
                role : role || "USER"


            },
        });
        console.log("Conexion exitosa, usuario creado");
        res.status(201).json(user);
     } catch (error) {
        res.status(400).json({error :error.message});
        console.log("error en crear usuario");
     }
}