import throng from 'throng';
import Queue from 'bull';
import { openRealm } from './realm';
import { prepare } from './helpers/forms';
import { sync } from './realm/sync';
import { log } from './helpers/log';

let PORT = '19499';
let HOST = 'ec2-52-202-160-22.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {

	let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 

  workQueue.process(maxJobsPerWorker, async (job, done) => {

		const realm = await openRealm(job.data.organizationId);
	
		const forms = prepare(job.data.forms); 

		sync(realm, forms);

		realm.close(); 

		done(null, { organizationId: job.data.organizationId });
		
	});
	
	workQueue.on('completed', function(job, result){
		console.log('complete', job.id, result); 
		//finally update with the status log__c in organizationid
		//write back to org query for login info
		log(job.id, result)
	});

	//realm listener pushes to redis queue and redis queue consumes this
	//the listner consumer process the updates and then updates the final org

}

throng({ workers, start });