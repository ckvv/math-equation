const serve = require('koa-static');
const Koa = require('koa');
const app = new Koa();
 
 
// or use absolute paths
app.use(serve(__dirname + '/public'));
 
app.listen(3000);
 
console.log('http://localhost:3000/');
