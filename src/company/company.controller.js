import Company from "../company/company.model.js"

export const createCompany = async (req, res) => {
    try {
        const data = req.body

        const company = await Company.create(data)

        return res.status(201).json({
            success: true,
            message: "Empresa agregada con exito !!!",
            company
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar empresa",
            error: err.message
        })
    }
}