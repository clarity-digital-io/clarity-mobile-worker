import { openRealm } from '../realm';
import { prepare } from '../helpers/forms';
import { sync } from '../realm/sync';

export const forms = async (job, done) => {

		const realm = await openRealm(job.data.organizationId);
	
		const forms = prepare(job.data.forms); 

		const picklists = prepare(job.data.picklists); 

		sync(realm, forms, [], picklists);

		realm.close(); 

		done(null, { organizationId: job.data.organizationId });
		
}