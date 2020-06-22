import express from 'express';
import bodyParser from 'body-parser';

import processRouter from './routes/process.js';

const PORT = process.env.PORT || 5000;

let app = express();

app.use(bodyParser.json())

app.use('/process', processRouter); 

app.listen(PORT, () =>
	console.log(`App listening on port ${PORT}!`),
);
