import Realm from 'realm';
import { FormSchema, QuestionSchema, QuestionOptionSchema, QuestionCriteriaSchema, FormConnectionSchema, FormConnectionFieldSchema, ChecklistGroupSchema, ChecklistSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

export const openRealm = async (organizationId) => {

	try {
		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { 	
			sync: { 
				user: adminUser, 
				url: REALM_URL + `/${organizationId}/forms`, 
				fullSynchronization: true, 
				validate_ssl: false 
			},  
			schema: [
				FormSchema, 
				QuestionSchema, 
				QuestionOptionSchema, 
				QuestionCriteriaSchema, 
				FormConnectionSchema, 
				FormConnectionFieldSchema,
				ChecklistGroupSchema
			] 
		};

		return Realm.open(config)
			.progress((transferred, transferable) => {
				console.log('progress', transferred, transferable)
			})
			.then(realm => {
				return realm; 
			})
			.catch((e) => {
				console.log('trying to open', e);
			});
			
	} catch (error) {
		console.log('error', error);
	}

}
