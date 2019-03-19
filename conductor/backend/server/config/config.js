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
   // process.env.MONGODB_URI = "mongodb://testing:test123@ds113866.mlab.com:13866/heroku_sk8z5qss"
   process.env.MONGODB_URI = "mongodb://user:123@cluster0-shard-00-00-aeopj.mongodb.net:27017,cluster0-shard-00-01-aeopj.mongodb.net:27017,cluster0-shard-00-02-aeopj.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true";
}
