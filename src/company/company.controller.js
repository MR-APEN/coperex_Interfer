import Company from "../company/company.model.js"
import xl from "excel4node"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createCompany = async (req, res) => {
    try {
        const data = req.body

        const company = await Company.create(data)

        const actualYear = new Date().getFullYear()
        const yearsExperience = actualYear - data.foundingYear

        return res.status(201).json({
            success: true,
            message: "Empresa agregada con exito !!!",
            company,
            yearsExperience
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar empresa",
            error: err.message
        })
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const companyUpdate = await Company.findByIdAndUpdate(cid, data, {new: true})

        const actualYear = new Date().getFullYear()
        const yearsExperience = actualYear - data.foundingYear

        return res.status(200).json({
            success: true,
            message: "Datos de la empresa actualizado!!",
            companyUpdate,
            yearsExperience
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar empresa :(",
            error: err.message
        })
    }
}

export const listCompanies = async (req, res) => {
    try {
        const wb = new xl.Workbook()
        const date = new Date().getDate()
        const time = new Date().getTime()
        const actualYear = new Date().getFullYear()
        const nombreArchivo = "Empresas_" + date + "_" + time
        const ws = wb.addWorksheet("Companies")
        const companies = await Company.find()    
        ws.cell(1, 1).string("Nombre")
        ws.cell(1, 2).string("Nivel de Impacto")
        ws.cell(1, 3).string("Año de Fundación")
        ws.cell(1, 4).string("Categoría")
        ws.cell(1, 5).string("Años de Trayectoria")
    
        companies.forEach((Company, index) => {
            const row = index + 2
    
            const yearsExperience = actualYear - Company.foundingYear
    
            ws.cell(row, 1).string(Company.name)
            ws.cell(row, 2).string(Company.levelImpact)
            ws.cell(row, 3).number(Company.foundingYear)
            ws.cell(row, 4).string(Company.categoryCompany)
            ws.cell(row, 5).number(yearsExperience)
        });

        const excelPath = join(__dirname, "../../public/excel", nombreArchivo+".xlsx")
        
        wb.write(nombreArchivo, res)
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar excel de empresa :(",
            error: err.message
        })
    }
}