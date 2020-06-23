import throng from 'throng';
import Queue from 'bull';
import { openRealm } from './realm';
import { prepare } from './helpers/forms';
import { sync } from './realm/sync';

let PORT = '19499';
let HOST = 'ec2-52-202-160-22.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
	// Connect to the named work queue
	let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 

  workQueue.process(maxJobsPerWorker, async (job) => {

		//prep forms 

		//open realm 

		//synforms 

		// const realm = await openRealm(organizationId);
	
		// const forms = prepareForms(req.body.forms); 

		// const status = await sync(realm, forms);

		//finally update with the status log__c in organizationid

		console.log('workqueue', job.id); 

		console.log('workqueue', job.data); 

    let progress = 0;
    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
		return { value: "This will be stored" };
		
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });