export const sendResponses = (job, done) => {
	
		const responses = job.data;

		sync(responses);

		done(null, { organizationId: job.data.organizationId });
		
}

const sync = (responses) => {
	console.log('all the way to sync responses', responses); 
}