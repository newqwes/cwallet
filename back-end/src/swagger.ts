import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { RUN_APP } from "./constants/telegram";

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Cwallet Telegram Mini App',
            version: '1.0.0',
            description: RUN_APP,
        },
        components: {
            schemas: {
                User: {
                    type: 'object',
                    properties: {
                        id: {
                            type: 'string',
                            format: 'uuid',
                            description: 'User ID'
                        },
                        telegramId: {
                            type: 'number',
                            description: 'Telegram ID'
                        },
                        firstName: {
                            type: 'string',
                            description: 'First name'
                        },
                        lastName: {
                            type: 'string',
                            description: 'Last name'
                        },
                        languageCode: {
                            type: 'string',
                            description: 'Language code'
                        },
                        nextClaimDate: {
                            type: 'string',
                            format: 'date-time',
                            description: 'Next date of claim. When user can push the claim button'
                        },
                        coins: {
                            type: 'integer',
                            description: 'Number of coins',
                            minimum: 0
                        },
                        avatar: {
                            type: 'string',
                            description: 'URL of the avatar'
                        },
                        level: {
                            type: 'integer',
                            description: 'User level'
                        }
                    },
                    required: ['id', 'telegramId', 'level']
                },
                Error: {
                    type: 'object',
                    properties: {
                        message: {
                            type: 'string',
                            description: 'Error message'
                        },
                        errors: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: 'Additional error details'
                        }
                    },
                    required: ['status', 'message']
                }
            },
            securitySchemes: {
                BearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                }
            },
            security: [
                {
                    BearerAuth: [],
                },
            ],
        },
    },
    apis: ['./src/routes/*.ts'],
};


const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: any, port: any) => {
    // Swagger UI setup
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
        customCss: '.swagger-ui .topbar { display: none }',
        customSiteTitle: "API Cwallet"
    }));

    app.get('/api-docs.json', (req: any, res: any) => {
        res.setHeader('Content-Type', 'application/json');
        res.send(swaggerSpec);
    });

    console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
}

