import prisma from "../config/prismaclient.js";


import bcrypt from "bcrypt";

export const newUsers = async(req, res)=>{
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

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try {

        // 1. Buscar usuario por email (AHORA SÍ CON await)
        const user = await prisma.user.findUnique({
            where: { email }
        });

        console.log("El usuario fue encontrado por el email");

        if (!user) {
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // 2. Verificar contraseña
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(400).json({ error: "Contraseña incorrecta" });
        }

        console.log("Login exitoso");
        res.status(200).json({
            message: "Login exitoso"
        });

    } catch (error) {
        console.log("Error en login:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};
