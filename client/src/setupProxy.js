const proxy = require('http-proxy-middleware')
 
module.exports = function(app) {
    app.use(proxy(['/api/surveys', '/api', '/auth/google'], { target: 'http://localhost:5000' }));
}