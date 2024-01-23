const swaggerJSDoc  = require("swagger-jsdoc");
const path = require('path');


const options = swaggerJSDoc.Options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Prueba documentatio",
            version: "1.0.0",
        },
    },
    apis: [`${path.join(__dirname, './routes/*')}`],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = { swaggerSpec };