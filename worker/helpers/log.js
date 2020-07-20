import axios from 'axios';
import { getClientAccessToken } from './access';


export const log = async (jobId, result) => {

	//const data = await getClientAccessToken(result.organizationId);
	
	//const response = await updateJobInfo(data, jobId); 

}

const updateJobInfo = async ({instance_url, access_token}, jobId) => {

	try {
		const response = await axios.post(`${instance_url}/services/apexrest/forms/v1/Jobs/${jobId}`, {}, { headers: { Authorization: "Bearer " + access_token } });
	} catch (error) {
		console.log('error'); 
	}

}