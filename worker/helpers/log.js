import axios from 'axios';

const grant_type = 'password';     
const client_id = '3MVG9Z8h6Bxz0zc4V._snL15FoFtwlrYRmvezul8wMJk0jx5CqffMMlS0afWQIQ9clkd1mZOxy.j6DTR4p7m9'; 
const client_secret = '00A082693387D6718AC18AEA088DC459F656E945B96FFE219EBF40C2D9345136'; 
const username = 'test-is7noj24esie@example.com';
const password = 'Clarity2020!hK0S8pi2pXOQ7tjsADGijhFV';

export const log = async (jobId, result) => {

	const { access_token } = await getAccessToken(result.organizationId);
	console.log('data 0', access_token); 

	const test = await updateJobInfo(access_token, jobId); 

}

const getAccessToken = async (organizationId) => {

	try {
		const { data } = await axios.post(`https://test.salesforce.com/services/oauth2/token?grant_type=${grant_type}&client_id=${client_id}&client_secret=${client_secret}&username=${username}&password=${password}`);

		const response = await axios.post(`${data.instance_url}/services/apexrest/Tokens/${organizationId}`, {}, { headers: { Authorization: "Bearer " + data.access_token } });
		console.log(response)
		return response.data; 
	} catch (error) {
		console.log('error', error); 
	}

}

const updateJobInfo = async (access_token, jobId) => {

	try {
		const response = await axios.post(`https://saas-app-3236-dev-ed.cs40.my.salesforce.com/services/apexrest/forms/v1/Jobs/${jobId}`, {}, { headers: { Authorization: "Bearer " + access_token } });
		console.log('response updatejobinfo', response); 
	} catch (error) {
		console.log('error', error); 
	}

}