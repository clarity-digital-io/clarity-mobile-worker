export const sendAnswers = async (job, done) => {
	
		const answers = job.data;
		const organizationId = job.data.organizationId;

		const response = await sync(answers, organizationId);
		console.log('response', response); 
		done(null, { organizationId: organizationId });
		
}

const sync = async (answers, organizationId) => {

	const data = await getAccessToken(organizationId);
	
	const response = await updateAnswers(data, answers); 

	return response; 

}

const getAccessToken = async (organizationId) => {

	try {
		const { data } = await axios.post(`https://test.salesforce.com/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`);

		const response = await axios.post(`${data.instance_url}/services/apexrest/Tokens/${organizationId}`, {}, { headers: { Authorization: "Bearer " + data.access_token } });
		console.log('response', response); 
		return response.data; 

	} catch (error) {
		console.log('error', error); 
	}

}

const updateAnswers = async ({url, access_token}, jobId) => {

	try {
		const response = await axios.post(`${url}/services/apexrest/forms/v1/Answers/${jobId}`, {}, { headers: { Authorization: "Bearer " + access_token } });
		console.log('response updatejobinfo', response); 
		return response; 
	} catch (error) {
		console.log('error', error); 
	}

}