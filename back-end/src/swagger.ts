import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { RUN_APP } from './constants/telegram';

const User = {
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
    referralCode: {
      type: 'string',
      description: 'User referral code'
    },
    refParent: {
      type: 'number',
      description: 'Inviter/parent telegram id'
    },
    referralCodeChangedTimes: {
      type: 'number',
      description: 'How many times user was changed his referral code'
    },

    referralRewards: {
      type: 'number',
      description: 'Количество монет которые тебе накопили все твои рефералы, оно не входит в число coins'
    },
    refGrandParent: {
      type: 'number',
      description: 'Telegram ID того кто пригласил того кто тебя пригласил)'
    },
    luckLevel: {
      type: 'number',
      description: 'Уровень везения, сейчас ни на что не влияет'
    },
    secretLevel: {
      type: 'number',
      description: 'Секретный уровень, пока не влияет ни на что'
    },
    miningLevel: {
      type: 'number',
      description: 'Уровень добычи монет, чем больше тем больше монет за клейм добываешь'
    },
    timeLevel: {
      type: 'number',
      description: 'Уровень времени, чем больше тем больше нужно жадать нажатия кнопки, и монет соответсвенно добавить больше. Повышает как время ожидания так и количество добычи монет'
    }
  }
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'CWAllet.one Telegram Mini App',
      version: 'Beta 0.1.0',
      description: RUN_APP
    },
    components: {
      schemas: {
        User: User,
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
          }
        },
        Referral: User
      },
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      },
      security: [
        {
          BearerAuth: []
        }
      ]
    }
  },
  apis: ['./src/routes/*.ts']
};


const swaggerSpec = swaggerJsdoc(options);

export const swaggerDocs = (app: any, port: any) => {
  // Swagger UI setup
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'API CWAllet.one'
  }));

  app.get('/api-docs.json', (req: any, res: any) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });

  console.log(`Swagger docs available at http://localhost:${port}/api-docs`);
};

