import { body } from "express-validator"
import { validateField } from "./field-validator.js"
import { handleError } from "./handle-error.js"
import { validateJWT } from "./jwt-validator.js"
import { nameCompanyExist } from "../helpers/db-validator.js"

export const createCompanyValidator = [
    validateJWT,
    body("name", "El nombre es requerido").notEmpty(),
    body("name").custom(nameCompanyExist),
    body("levelImpact", "El nivel de impacto es requerido").notEmpty(),
    body("yearsExperience", "Los años de trayectoria es requerido").notEmpty(),
    body("categoryCompany", "La categoría de la empresa es requerida").notEmpty(),
    validateField,
    handleError
]