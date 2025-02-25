import Company from "../company/company.model.js"

export const nameCompanyExist = async (name= "") => {
    const exist = await Company.findOne({name})
    if(exist) {
        throw new Error(`El nombre de la empresa: ${name} ya fue registrado`)
    }
}