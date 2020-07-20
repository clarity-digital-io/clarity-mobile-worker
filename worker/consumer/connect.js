import { openRealm } from '../realm';
import { prepare } from '../helpers/forms';
import { sync } from '../realm/sync';

export const connect = async (job, done) => {

		const realm = await openRealm(job.data.organizationId);
	
		const forms = prepare(job.data.forms); 

		const groups = prepareGroups(job.data.groups); 

		sync(realm, forms, groups);

		realm.close(); 

		done(null, { organizationId: job.data.organizationId });
		
}