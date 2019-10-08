//config file determines the environment that you are working in
//development: localhost mongodb database
//testing: localhost mongodb database
//production: heroku remote mongodb database

var env = process.env.NODE_ENV || 'development';
console.log('env *****', env);

if (env === 'development') {
   process.env.PORT = 3000;
   process.env.MONGODB_URI = 'mongodb://localhost:27017/TicketManager', {useNewUrlParser:true};
} else if (env === 'test') {
   process.env.PORT = 3000;
   process.env.MONGODB_URI = 'mongodb://localhost:27017/TicketManagerTest', {useNewUrlParser:true};
} else {
   process.env.MONGODB_URI = "mongodb://testing:test123@ds113866.mlab.com:13866/heroku_sk8z5qss"
}
