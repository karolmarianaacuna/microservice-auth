import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Backend AUTH - API",
      version: "1.0.0",
      description: "Documentación generada con Swagger para el microservicio de autenticación",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT"
        }
      }
    }
  },
  apis: ["./src/routes/*.js"], // rutas donde está la documentación
};

const swaggerSpec = swaggerJsdoc(options);

export { swaggerUi, swaggerSpec };
