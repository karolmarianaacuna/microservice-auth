import prisma from "../config/prismaclient.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const newUsers = async (req, res) => {
    const { name, lastname, email, password, role } = req.body;

    try {
        const hashed = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                name,
                lastname,
                email,
                password: hashed,

                // Si no envían role → será USER automáticamente
                role: role || "USER"


            },
        });
        console.log("Conexion exitosa, usuario creado");
        res.status(201).json(user);
    } catch (error) {
        res.status(400).json({ error: error.message });
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

        

        // 3. CREAR TOKEN JWT
        const token = jwt.sign(
            {
                id: user.id,
                email: user.email,
                role: user.role
            },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );


        // 4. ENVIAR TOKEN AL FRONTEND
        console.log("Login exitoso");
        res.status(200).json({
            message: "Login exitoso",
             token: token
        });

    } catch (error) {
        console.log("Error en login:", error.message);
        res.status(500).json({ error: "Error interno del servidor" });
    }
};


export const verifyToken = async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ error: "Token requerido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        res.status(200).json({
            valid: true,
            user: decoded
        });

    } catch (error) {
        res.status(401).json({ valid: false, error: "Token inválido" });
    }
};



