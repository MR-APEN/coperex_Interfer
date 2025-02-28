import { body, param } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleError } from "./handle-error.js"
import { validateJWT } from "./jwt-validator.js"
import { nameCompanyExist, companyExist } from "../helpers/db-validator.js"

export const createCompanyValidator = [
    validateJWT,
    body("name", "El nombre es requerido").notEmpty(),
    body("name").custom(nameCompanyExist),
    body("levelImpact", "El nivel de impacto es requerido").notEmpty(),
    body("yearFoundation", "El año de fundación de la empresa es requerido").notEmpty(),
    body("categoryCompany", "La categoría de la empresa es requerida").notEmpty(),
    validateField,
    handleError
]

export const updateCompanyValidator = [
    validateJWT,
    param("cid", "No es un ID válido").isMongoId(),
    param("cid").custom(companyExist),
    validateField,
    handleError
]

export const listCompaniesValidator = [
    validateJWT,
    validateField,
    handleError
]