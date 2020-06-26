import axios from 'axios';
import { getClientAccessToken } from '../helpers/access';

export const sendResponses = async (job, done) => {
	
	const responses = job.data.body;
	const organizationId = job.data.organizationId;

	const response = await sync(responses, organizationId);

	done(null, { organizationId: organizationId });
		
}

const sync = async (responses, organizationId) => {

	const data = await getClientAccessToken(organizationId);
	
	const response = await updateResponses(data, responses); 

	return response; 

}

const updateResponses = async ({instance_url, access_token, refresh_token}, responses) => {
	console.log('responses', responses); 

	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Responses`, { data: responses }, { headers: { Authorization: "Bearer " + access_token } });
		return response; 
	} catch (error) {
		if(error.response) {
			console.log('error.response', error.response); 
		}

		if(error.request) {
			console.log('error.request')
		}
	}

}