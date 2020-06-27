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
	console.log('responses', instance_url, access_token, responses); 

	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Responses`, { data: responses }, { headers: { Authorization: "Bearer " + access_token } });
		//on response we can update the sync status produce a new job for syncing
		return response; 
	} catch (error) {
		if(error.response) {
			const { data } = error.response; 
			console.log('data', data); 
		}

		if(error.request) {
			const { data } = error.request; 
			console.log('data', data); 
		}
	}

}

export const deleteResponses = async (job, done) => {
	
	const responseUUIDs = job.data.body;
	console.log('responseUUIDs0', responseUUIDs)
	const organizationId = job.data.organizationId;

	const response = await deleteSync(responseUUIDs, organizationId);

	done(null, { organizationId: organizationId });
		
}

const deleteSync = async (responseUUIDs, organizationId) => {

	const data = await getClientAccessToken(organizationId);
	
	const response = await deleteResponseByIds(data, responseUUIDs); 

	return response; 

}

const deleteResponseByIds = async ({instance_url, access_token, refresh_token}, responseUUIDs) => {
	console.log('responseUUIDs', instance_url, access_token, responseUUIDs); 

	try {
		const response = await axios.delete(`${instance_url}/services/apexrest/forms/v1/Responses`, { data: responseUUIDs, 	headers: { Authorization: "Bearer " + access_token } });
		return response; 
	} catch (error) {
		if(error.response) {
			const { data } = error.response; 
			console.log('data', data); 
		}

		if(error.request) {
			const { data } = error.request; 
			console.log('data', data); 
		}
	}

}
