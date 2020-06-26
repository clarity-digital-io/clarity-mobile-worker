import axios from 'axios';
import { getClientAccessToken } from '../helpers/access';

export const sendAnswers = async (job, done) => {
	
		const answers = job.data.body;
		const organizationId = job.data.organizationId;

		const response = await sync(answers, organizationId);

		done(null, { organizationId: organizationId });
		
}

const sync = async (answers, organizationId) => {

	const data = await getClientAccessToken(organizationId);
	
	const response = await updateAnswers(data, answers); 

	return response; 

}

const updateAnswers = async ({instance_url, access_token}, answers) => {
	console.log('answers', answers); 
	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Answers`, { data: answers }, { headers: { Authorization: "Bearer " + access_token } });
		return response; 
	} catch (error) {
		console.log('error'); 
	}

}