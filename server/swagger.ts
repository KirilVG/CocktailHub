import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: 'v1.0.0',
        title: 'GYC Documentation',
        description: ''
    },
    servers: [
        {
            url: 'http://localhost:4040',
            description: 'GYC API Server'
        },
    ],
    components: {
        securitySchemes: {
            cookieAuth: {
                type: 'apiKey',
                in: 'cookie',
                name: 'accessToken',
            }
        }
    }
};

const outputFile = './swagger_output.json';
const endpointsFiles = ['./server/routes/index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, endpointsFiles, doc);