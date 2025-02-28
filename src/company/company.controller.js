import Company from "./company.model.js"
import xl from "excel4node"
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
        const companies = await Company.find();
        const actualYear = new Date().getFullYear()
        if(companies.length === 0) {
            return res.status(404).json({
                success: false,
                msg: 'No se encontraron empresas.'
            })
        }
        
        const wb = new xl.Workbook(); // Crea un nuevo libro de excel
        const ws = wb.addWorksheet('Empresas'); // Crea una hoja

        const headerStyle = wb.createStyle({ // Define el estilo de celda
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

        ws.cell(1, 1).string('Nombre').style(headerStyle); // Agrega los encabezados a la hoja
        ws.cell(1, 2).string('Nivel de Impacto').style(headerStyle);
        ws.cell(1, 3).string('Año de Fundación').style(headerStyle);
        ws.cell(1, 4).string('Categoría').style(headerStyle);
        ws.cell(1, 5).string('Años de Experiencia').style(headerStyle);

        let row = 2;
        companies.forEach(company => { // Recorre todo el array de empresas y las agrega a la hoja
            const yearsExperience = actualYear - company.yearFoundation

            ws.cell(row, 1).string(company.name).style(contentStyle); // Agrega los datos de la empresa a la hoja
            ws.cell(row, 2).string(company.levelImpact).style(contentStyle);
            ws.cell(row, 3).number(company.yearFoundation).style(contentStyle);
            ws.cell(row, 4).string(company.categoryCompany).style(contentStyle);
            ws.cell(row, 5).number(yearsExperience).style(contentStyle);
            row = row + 1;
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