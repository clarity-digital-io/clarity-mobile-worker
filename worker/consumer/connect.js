import { openRealm } from '../realm';
import { prepare } from '../helpers/forms';
import { prepareGroups } from '../helpers/groups';
import { preparePicklists } from '../helpers/picklists';
import { sync } from '../realm/sync';

export const connect = async (job, done) => {
		
		const realm = await openRealm(job.data.organizationId);
	
		const forms = prepare(job.data.forms); 

		const groups = prepareGroups(job.data.groups); 

		const picklists = preparePicklists(job.data.picklists); 

		sync(realm, forms, groups, picklists);

		realm.close(); 

		done(null, { organizationId: job.data.organizationId });
		
}