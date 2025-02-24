import { Schema, model } from "mongoose"

const userSchema = Schema({
    name:{
        type: String,
        required: [true, "El nombre es requerido"],
        maxLength: [25, "El nombre no puede exceder los 25 caracteres"]
    },
    surname:{
        type: String,
        required: [true, "El apellido es requerido"],
        maxLength: [25, "El apellido no puede exceder los 25 caracteres"]
    },
    email:{
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password:{
        type: String,
        required: [true, "La contraseña es requerida"]
    },
    role:{
        type: String,
        enum: ["ADMIN_ROLE"],
        default: "ADMIN_ROLE"
    }
},
{
    versionKey: false,
    timeStamps: true
})

export default model("User", userSchema)