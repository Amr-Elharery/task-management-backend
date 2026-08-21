const fs = require('fs');
const YAML = require('yaml');
const path = require('path');
const { serverUrl, port, isDev } = require('./config');

const openapiPath = path.join(__dirname, '../docs/openapi.yaml');

const swaggerSpec = YAML.parse(fs.readFileSync(openapiPath, 'utf8'));

swaggerSpec.servers = [
  {
    url: isDev ? `${serverUrl}:${port}` : serverUrl,
    description: isDev ? 'Local development server' : 'Production server',
  },
];

module.exports = swaggerSpec;
