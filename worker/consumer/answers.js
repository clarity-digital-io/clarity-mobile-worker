import axios from 'axios';
import { getClientAccessToken } from '../helpers/access';

export const sendAnswers = async (job, done) => {
	
		const body = job.data.body;
		const organizationId = job.data.organizationId;

		const response = await sync(body, organizationId);

		done(null, { organizationId: organizationId });
		
}

const sync = async (body, organizationId) => {

	const data = await getClientAccessToken(organizationId);

	const [answers, attachments] = filterAnswers(JSON.parse(body)); 
	
	if(answers.length > 0) {
		const response = await updateAnswers(data, answers); 
		return response; 
	}

	if(attachments.length > 0) {
		const responseAttachments = await updateAttachments(data, attachments); 
		return responseAttachments; 
	}

}

const filterAnswers = (body) => {
	console.log('body', body); 
	let answers = body.filter(ans => !ans.IsAttachment);
	let attachments = body.filter(ans => ans.IsAttachment);
	return [answers, attachments];
}

const updateAnswers = async ({instance_url, access_token}, answers) => {

	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Answers`, { data: answers }, { headers: { Authorization: "Bearer " + access_token } });
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

const updateAttachments = async ({instance_url, access_token}, attachments) => {
	console.log('attachments', attachments); 
	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Attachments`, { data: JSON.stringify(attachments) }, { headers: { Authorization: "Bearer " + access_token } });
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