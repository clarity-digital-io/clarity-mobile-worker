import throng from 'throng';
import Queue from 'bull';
import { log } from './helpers/log';
import { connect } from './consumer/connect';
import { sendAnswers } from './consumer/answers';

let PORT = '19499';
let HOST = 'ec2-52-202-160-22.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
	//with more queues we can loop through these for failed completed stalled and process
	//maybe separate by orgid + Connect or an extra identifier
	let connectQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
  connectQueue.process(maxJobsPerWorker, async (job, done) => connect(job, done));
	connectQueue.on('completed', (job, result) => log(job.id, result));

	let realmQueue = new Queue('answers', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
  realmQueue.process(maxJobsPerWorker, async (job, done) => sendAnswers(job, done));
	realmQueue.on('completed', (job, result) => log(job.id, result));

}

throng({ workers, start });