import { openRealm } from '../realm';
import { prepare } from '../helpers/forms';
import { sync } from '../realm/sync';

export const connect = async (job, done) => {
	console.log('job',job);

	const realm = await openRealm(job.data.organizationId);

	const forms = prepare(job.data.forms); 

	const groups = prepareGroups(job.data.groups); 
	console.log('groups',groups);
	sync(realm, forms, groups);

	realm.close(); 

	done(null, { organizationId: job.data.organizationId });
		
}