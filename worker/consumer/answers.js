import { prepare } from '../helpers/forms';
import { sync } from '../realm/sync';

export const sendAnswers = (job, done) => {
	
		const answers = job.data;

		sync(answers);

		done(null, { organizationId: job.data.organizationId });
		
}

const sync = (answers) => {
	console.log('all the way to sync', answers); 
}