import Company from "../company/company.model.js"

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