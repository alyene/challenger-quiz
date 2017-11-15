module.exports = function(app, pool, server) {

    require('./services/auth')(app, pool);
    require('./services/questions')(app, pool);
    require('./services/quiz')(app, pool, server);
    
}