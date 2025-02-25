import swaggerJSDoc from "swagger-jsdoc"
import swaggerUi from "swagger-ui-express"

const swagger = {
    swaggerDefinition:{
        openapi:"3.0.0",
        info:{
            title: "Coperex Interfer API",
            version: "1.0.0",
            description: "API de la empresa Coperex para gestionar la incorporación de nuevos socios y empresas en Interfer",
            contact:{
                name: "Javier Apen",
                email: "japen-2023128@kinal.edu.gt"
            }
        },
        servers:[
            {
                url: "http://127.0.0.1:3004/coperexInterfer/v1"
            }
        ]
    },
    apis:[
        "./src/auth/*.js",
        "./src/company/*.js"
    ]
}

const swaggerDocs = swaggerJSDoc(swagger)

export { swaggerDocs, swaggerUi }