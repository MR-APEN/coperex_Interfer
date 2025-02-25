import { Router } from "express"
import { createCompany } from "./company.controller.js"
import { createCompanyValidator } from "../middlewares/company-validator.js"

const router = Router()

/**
 * @swagger
 * /createCompany:
 *   post:
 *     summary: Agrega una empresa
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               levelImpact:
 *                 type: string
 *               yearsExperience:
 *                 type: number
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa agregada exitosamente
 *       400:
 *         description: Error en la solicitud
 */
router.post(
    "/createCompany",
    createCompanyValidator, 
    createCompany
)

export default router