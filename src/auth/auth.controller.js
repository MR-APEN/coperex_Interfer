import User from "../user/user.model.js"
import { generateJWT } from "../helpers/generate-JWT.js"
import { verify } from "argon2"

export const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email: email})
        if(!user) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Email incorrecto"
            })
        }

        const matchPassword = await verify(user.password, password)
        if(!matchPassword) {
            return res.status(400).json({
                message: "Credenciales inválidas",
                error: "Contraseña incorrecta"
            })
        }

        const token = await generateJWT(user.id)

        return res.status(200).json({
            message:"Inicio de sesión exitoso!!",
            userDetails: {
                token: token,
                email: user.email,
            }
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al iniciar sesión",
            error: err.message
        })
    }
}