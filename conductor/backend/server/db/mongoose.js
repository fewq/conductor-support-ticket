var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect(process.env.MONGODB_URI);

module.export = {
   mongoose: mongoose
};

//mongose allows us to connect to our database and we specify that it uses the standard Promise operations.
//"mongodb://lewlian:sean021296@ds011258.mlab.com:11258/heroku_sjzxb7x5"
