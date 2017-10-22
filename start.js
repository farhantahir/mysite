const mongoose = require('mongoose');
const dotevn = require('dotenv');

dotevn.config({ path: '.env' });

mongoose.connect(process.env.DATABASE, {
	useMongoClient: true,
});
mongoose.Promise = global.Promise;
mongoose.connection.on('error', (error) => {
	console.log('An Error occured during DB connection', error);
});

// setup modules below
require('./models/User');
require('./models/Project');
require('./models/Experience');

const app = require('./app');
app.set('port', process.env.PORT || 3001);
app.listen(app.get('port'), () => {
	console.log(`App Listening on ${app.get('port')}`);
});

