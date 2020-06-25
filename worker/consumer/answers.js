import { prepare } from '../helpers/forms';

export const sendAnswers = (job, done) => {
	
		const answers = job.data;

		sync(answers);

		done(null, { organizationId: job.data.organizationId });
		
}

const sync = (answers) => {
	console.log('all the way to sync', answers); 
}