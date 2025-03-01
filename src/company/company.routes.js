import { Router } from "express"
import { createCompany, updateCompany, listCompanies, listByYearsCompanies, listByCategoryCompanies, listCompaniesAZ, listCompaniesZA} from "./company.controller.js"
import { createCompanyValidator, updateCompanyValidator, listCompaniesValidator } from "../middlewares/company-validator.js"

const router = Router()

/**
 * @swagger
 * /company/createCompany:
 *   post:
 *     summary: Create a new company
 *     tags: [Company]
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
 *               yearFoundation:
 *                 type: number
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       201:
 *         description: Empresa agregada con exito !!!
 *       500:
 *         description: Error al agregar empresa
 */
router.post(
    "/createCompany",
    createCompanyValidator, 
    createCompany
)

/**
 * @swagger
 * /company/updateCompany/{cid}:
 *   put:
 *     summary: Update an existing company
 *     tags: [Company]
 *     parameters:
 *       - in: path
 *         name: cid
 *         schema:
 *           type: string
 *         required: true
 *         description: Company ID
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
 *               yearFoundation:
 *                 type: number
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       200:
 *         description: Datos de la empresa actualizado!!
 *       500:
 *         description: Error al actualizar empresa :(
 */
router.put("/updateCompany/:cid", updateCompanyValidator, updateCompany)

/**
 * @swagger
 * /company/listCompany:
 *   get:
 *     summary: List all companies
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Excel generado con exito!!
 *       404:
 *         description: No se encontraron empresas. :(
 *       500:
 *         description: Error al generar excel de empresa :(
 */
router.get("/listCompany", listCompaniesValidator, listCompanies)

/**
 * @swagger
 * /company/listCompanyByYearsExpierence:
 *   get:
 *     summary: List companies by years of experience
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               minYears:
 *                 type: number
 *               maxYears:
 *                 type: number
 *     responses:
 *       200:
 *         description: Excel generado con exito!!
 *       404:
 *         description: No se encontraron empresas con los años de experiencia solicitados. :(
 *       500:
 *         description: Error al generar excel de empresa :(
 */
router.get("/listCompanyByYearsExpierence", listCompaniesValidator, listByYearsCompanies)

/**
 * @swagger
 * /company/listByCategoryCompanies:
 *   get:
 *     summary: List companies by category
 *     tags: [Company]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               categoryCompany:
 *                 type: string
 *     responses:
 *       200:
 *         description: Excel generado con exito!!
 *       404:
 *         description: No se encontraron empresas. :(
 *       500:
 *         description: Error al generar excel de empresa :(
 */
router.get("/listByCategoryCompanies", listCompaniesValidator, listByCategoryCompanies)

/**
 * @swagger
 * /company/listCompaniesAZ:
 *   get:
 *     summary: List companies sorted A-Z
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Excel generado con exito!!
 *       404:
 *         description: No se encontraron empresas. :(
 *       500:
 *         description: Error al generar excel de empresa :(
 */
router.get("/listCompaniesAZ", listCompaniesValidator, listCompaniesAZ)

/**
 * @swagger
 * /company/listCompaniesZA:
 *   get:
 *     summary: List companies sorted Z-A
 *     tags: [Company]
 *     responses:
 *       200:
 *         description: Excel generado con exito!!
 *       404:
 *         description: No se encontraron empresas. :(
 *       500:
 *         description: Error al generar excel de empresa :(
 */
router.get("/listCompaniesZA", listCompaniesValidator, listCompaniesZA)

export default router