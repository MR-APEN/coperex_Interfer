import Company from "./company.model.js"
import xl from "excel4node"
import { header } from "express-validator"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))

export const createCompany = async (req, res) => {
    try {
        const data = req.body

        const company = new Company({
            name: data.name,
            levelImpact: data.levelImpact,
            yearFoundation: data.yearFoundation,
            categoryCompany: data.categoryCompany
        })

        await company.save()

        const actualYear = new Date().getFullYear()
        const yearsExperience = actualYear - data.yearFoundation

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
        const yearsExperience = actualYear - data.yearFoundation

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
        const companies = await Company.find()
        const actualYear = new Date().getFullYear()
        if(companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas. :("
            })
        }
        
        const wb = new xl.Workbook()
        const ws = wb.addWorksheet('Empresas')

        const headerStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 12,
                bold: true
            }
        })

        const contentStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 10,
            }
        })

        const headers = ["Nombre", "Nivel de Impacto", "Año de Fundación", "Categoría", "Años de Experiencia"]
        headers.forEach((header, col) => {
            ws.cell(1, col + 1).string(header).style(headerStyle)
        })

        let row = 2;
        companies.forEach(company => {
            const yearsExperience = actualYear - company.yearFoundation

            ws.cell(row, 1).string(company.name).style(contentStyle)
            ws.cell(row, 2).string(company.levelImpact).style(contentStyle)
            ws.cell(row, 3).number(company.yearFoundation).style(contentStyle)
            ws.cell(row, 4).string(company.categoryCompany).style(contentStyle)
            ws.cell(row, 5).number(yearsExperience).style(contentStyle)
            row = row + 1
        })


        const date = new Date().getDate()
        const time = new Date().getTime()
        const nombreArchivo = "Empresas_" + date + "_" + time
        const excelPath = join(__dirname, "../../public/excel", nombreArchivo+".xlsx")
        
        wb.write(excelPath)

        return res.status(200).json({
            success: true,
            message: "Excel generado con exito!!",
            excelPath
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar excel de empresa :(",
            error: err.message
        })
    }
}

export const listByYearsCompanies = async (req, res) => {
    try {   
        const {minYears, maxYears} = req.body
        const companies = await Company.find()
        const actualYear = new Date().getFullYear()
        if(companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas. :("
            })
        }

        const companyWithAge = companies.map((company) => {
            const yearsExperience = actualYear - company.yearFoundation 
            return {
                ...company.toObject(),
                yearsExperience
            }
        })

        const companiesFilter = companyWithAge.filter(company => 
            company.yearsExperience >= minYears && company.yearsExperience <= maxYears
        ) 

        if(companiesFilter.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas con los años de experiencia solicitados. :("
            })
        }

        const wb = new xl.Workbook()
        const ws = wb.addWorksheet('Empresas')

        const headerStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 12,
                bold: true
            }
        })

        const contentStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 10,
            }
        })

        const headers = ["Nombre", "Nivel de Impacto", "Año de Fundación", "Categoría", "Años de Experiencia"]
        headers.forEach((header, col) => {
            ws.cell(1, col + 1).string(header).style(headerStyle)
        })

        let row = 2;
        companiesFilter.forEach(company => {
            ws.cell(row, 1).string(company.name).style(contentStyle)
            ws.cell(row, 2).string(company.levelImpact).style(contentStyle)
            ws.cell(row, 3).number(company.yearFoundation).style(contentStyle)
            ws.cell(row, 4).string(company.categoryCompany).style(contentStyle)
            ws.cell(row, 5).number(company.yearsExperience).style(contentStyle)
            row = row + 1
        })

        const date = new Date().getDate()
        const time = new Date().getTime()
        const nombreArchivo = "Empresas_" + date + "_" + time
        const excelPath = join(__dirname, "../../public/excel", nombreArchivo+".xlsx")
        
        wb.write(excelPath)

        return res.status(200).json({
            success: true,
            message: "Excel generado con exito!!",
            excelPath
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar excel de empresa :(",
            error: err.message
        })
    }
}

export const listByCategoryCompanies = async (req, res) => {
    try {   
        const { categoryCompany } = req.body
        const companies = await Company.find({categoryCompany})
        const actualYear = new Date().getFullYear()

        if(companies.length === 0) {
            return res.status(404).json({
                success: false,
                message: "No se encontraron empresas. :("
            })
        }

        const companyWithAge = companies.map((company) => {
            const yearsExperience = actualYear - company.yearFoundation 
            return {
                ...company.toObject(),
                yearsExperience
            }
        })

        const wb = new xl.Workbook()
        const ws = wb.addWorksheet('Empresas')

        const headerStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 12,
                bold: true
            }
        })

        const contentStyle = wb.createStyle({
            font: {
                name: 'Arial',
                color: '#000000',
                size: 10,
            }
        })

        const headers = ["Nombre", "Nivel de Impacto", "Año de Fundación", "Categoría", "Años de Experiencia"]
        headers.forEach((header, col) => {
            ws.cell(1, col + 1).string(header).style(headerStyle)
        })

        let row = 2;
        companyWithAge.forEach(company => {
            ws.cell(row, 1).string(company.name).style(contentStyle)
            ws.cell(row, 2).string(company.levelImpact).style(contentStyle)
            ws.cell(row, 3).number(company.yearFoundation).style(contentStyle)
            ws.cell(row, 4).string(company.categoryCompany).style(contentStyle)
            ws.cell(row, 5).number(company.yearsExperience).style(contentStyle)
            row = row + 1
        })

        const date = new Date().getDate()
        const time = new Date().getTime()
        const nombreArchivo = "Empresas_" + date + "_" + time
        const excelPath = join(__dirname, "../../public/excel", nombreArchivo+".xlsx")
        
        wb.write(excelPath)

        return res.status(200).json({
            success: true,
            message: "Excel generado con exito!!",
            excelPath
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al generar excel de empresa :(",
            error: err.message
        })
    }
}