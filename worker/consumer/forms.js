import { openRealm } from '../realm';
import { prepare } from '../helpers/forms';
import { sync } from '../realm/sync';

export const forms = async (job, done) => {

		const realm = await openRealm(job.data.organizationId);
	
		const forms = prepare(job.data.forms); 

		let syncForm = true; 

		sync(realm, forms, [], syncForm);

		realm.close(); 

		done(null, { organizationId: job.data.organizationId });
		
}