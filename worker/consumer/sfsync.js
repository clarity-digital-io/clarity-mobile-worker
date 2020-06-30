import Realm from 'realm';
import { ResponseSchema, AnswerSchema, sObjectSchema } from '../schema'; 

const SERVER_URL = 'https://forms-dev.us1a.cloud.realm.io';
const REALM_URL = 'realms://forms-dev.us1a.cloud.realm.io';

export const sfsync = async (job, done) => {

	const salesforceRecords = prepare(job.data.sobjects); 

	await openUserRealms(salesforceRecords, job.data.userId);

	done(null, { userId: job.data.userId });
		
}

const openUserRealms = async (salesforceRecords, userId) => {
	
	try {

		const adminUser = await Realm.Sync.User.login(SERVER_URL, Realm.Sync.Credentials.nickname('realm-admin', true));
		const config = { sync: { user: adminUser, url: REALM_URL + `/salesforce-sandbox_${userId}/user`, fullSynchronization: true, validate_ssl: false },  schema: [ResponseSchema, AnswerSchema, sObjectSchema] };
		const realm = await Realm.open(config);	

		realm.write(() => {

			salesforceRecords.forEach(record => {
				realm.create('sObject', record, 'all');	
			});
	
		});
	
		realm.close(); 
		
	} catch (error) {
		console.log('error', error);
	}

	return userRealms;

}

const prepare = (salesforceRecords) => {

	return salesforceRecords.map(record => {

		return {
			Id : record.Id, 
			Name: record.Name, 
			Type: 'Account', 
			LastModifiedDate: record.LastModifiedDate,
			CreatedDate: record.CreatedDate,
			Values: getValues(record) //json object 
		}

	})

}

const exclude = ['Id', 'Name', 'LastModifiedDate', 'CreatedDate', 'attributes'];

const getValues = (record) => {

	let sObjectRecord = {};

	for (const property in record) {
		if(exclude.indexOf(property) == -1) {
			sObjectRecord[property] = record[property];
		} 
	}
	return JSON.stringify(sObjectRecord); 
	
}
