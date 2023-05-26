const awsServerlessExpress = require('aws-serverless-express')
const app = require('././src/server/index')
// const binaryMimeTypes = [
// 	'application/octet-stream',
// 	'font/eot',
// 	'font/opentype',
// 	'font/otf',
// 	'image/jpeg',
// 	'image/png',
// 	'image/svg+xml'
// ]
// const server = awsServerlessExpress.createServer(app, null, binaryMimeTypes);
const server = awsServerlessExpress.createServer(app);

exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context)