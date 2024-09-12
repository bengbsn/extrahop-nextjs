const swagger = require('./swagger');
const paths = Object.keys(swagger.paths);
const objects = new Set(paths.map(path => path.split('/')[1]));

console.log(paths.length)
//paths.forEach(item => console.log(item));