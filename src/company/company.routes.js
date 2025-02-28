import { Router } from "express"
import { createCompany, updateCompany, listCompanies, listByYearsCompanies, listByCategoryCompanies, listCompaniesAZ, listCompaniesZA} from "./company.controller.js"
import { createCompanyValidator, updateCompanyValidator, listCompaniesValidator } from "../middlewares/company-validator.js"

const router = Router()

/**
 * @swagger
 * /company/createCompany:
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
 *               foundingYear:
 *                 type: number
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa agregada exitosamente
 *       500:
 *         description: Error en la solicitud
 */
router.post(
    "/createCompany",
    createCompanyValidator, 
    createCompany
)

/**
 * @swagger
 * /company/updateCompany/:cid:
 *   put:
 *     summary: Actualiza datos de la empresa
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: cid
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               levelImpact:
 *                 type: string
 *               foundingYear:
 *                 type: number
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       500:
 *         description: Error en la solicitud
 */
router.put("/updateCompany/:cid", updateCompanyValidator, updateCompany)

router.get("/listCompany", listCompaniesValidator, listCompanies)

router.get("/listCompanyByYearsExpierence", listCompaniesValidator, listByYearsCompanies)

router.get("/listByCategoryCompanies", listCompaniesValidator, listByCategoryCompanies)

router.get("/listCompaniesAZ", listCompaniesValidator, listCompaniesAZ)

router.get("/listCompaniesZA", listCompaniesValidator, listCompaniesZA)

export default router