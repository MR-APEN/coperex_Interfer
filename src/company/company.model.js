import { Schema, model } from "mongoose"

const companySchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre de la empresa es requerido"],
        maxLength: [30, "El nombre de la empresa no puede exceder los 30 caracteres"],
        unique: true
    },
    levelImpact:{
        type: String,
        enum: ["FUERTE","MEDIO","BAJO"],
        required: [true, "El impacto de la empresa es requerido"]
    },
    yearsExperience:{
        type: Number,
        required: [true, "Los año de trayectoria son requeridos"],
        min: 0
    },
    categoryCompany:{
        type: String,
        required: [true, "La categoría empresarial es requerida"],
        maxLength: [30, "La categoría empresarial no puede exceder los 30 caracteres"]
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("Company", companySchema)