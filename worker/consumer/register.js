import Realm from 'realm';
import { ResponseSchema, AnswerSchema, sObjectSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

export const register = async (job, done) => {

		const userRealms = await openUserRealms(job.data.organizationId, job.data.users);
	
		done(null, { organizationId: job.data.organizationId, userRealms: userRealms });
		
}

const openUserRealms = async (organizationId, users) => {

	let userRealms = [];
	
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));

		for (let index = 0; index < users.length; index++) {
			let user = users[index];
			console.log('user', user); 
			const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${user}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema, AnswerSchema, sObjectSchema] };
			const realm = await Realm.open(config);	
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/salesforce-sandbox_${user}/user`, 'admin');
			await adminUser.applyPermissions({ userId: `salesforce-sandbox_${user}` }, `/${organizationId}/forms`, 'read');
			userRealms.push(user);
			realm.close(); 	
		}
		
	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}
