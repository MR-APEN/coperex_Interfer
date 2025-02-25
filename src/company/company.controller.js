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

export const updateCompany = async (req, res) => {
    try {
        const { cid } = req.params
        const data = req.body

        const companyUpdate = await Company.findByIdAndUpdate(cid, data, {new: true})

        return res.status(200).json({
            success: true,
            message: "Datos de la empresa actualizado!!",
            companyUpdate
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al actualizar empresa :(",
            error: err.message
        })
    }
}