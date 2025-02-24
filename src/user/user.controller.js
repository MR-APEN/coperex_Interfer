import { hash } from "argon2"
import User from "../user/user.model.js"

export const defaultUserAdmin = async () => {
    const defaultUser = {
        "name": "Alejandro",
        "surname": "Apen",
        "email": "aapen@admin.coperex",
        "password": "Apen2023$",
    }

    const userAdmin = await User.findOne({email: defaultUser.email})
    if(!userAdmin) {
        defaultUser.password = await hash(defaultUser.password)
        await User.create(defaultUser)
        console.log(`Usuario administrador creado nombre: ${defaultUser.name}, apellido: ${defaultUser.surname}, email: ${defaultUser.email}, contraseña: Apen2023$ `)
    }
}