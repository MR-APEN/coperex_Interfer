import { Router } from "express"
import { login } from "./auth.controller.js"
import { loginValidator } from "../middlewares/user-validator.js"

const router = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Inicia sesión de usuario admin
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Inicio de sesión exitoso
 *       500:
 *         description: Error en la solicitud
 */
router.post(
    "/login",
    loginValidator,
    login
)

export default router