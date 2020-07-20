import throng from 'throng';
import Queue from 'bull';
import { log } from './helpers/log';
import { connect } from './consumer/connect';
import { register } from './consumer/register';
import { sendAnswers } from './consumer/answers';
import { sendResponses, deleteResponses } from './consumer/responses';
import { sfsync } from './consumer/sfsync';

let PORT = '22829';
let HOST = 'ec2-54-87-144-92.compute-1.amazonaws.com';
let PASSWORD = 'p2be04e53cb71f4970daa5e90bc1f15f0c2086fd2850609eef7c057babf2051aa';

let workers = process.env.WEB_CONCURRENCY || 1;

let maxJobsPerWorker = 50;

function start() {
	//with more queues we can loop through these for failed completed stalled and process
	//maybe separate by orgid + Connect or an extra identifier
	console.log('start')
	try {
		let connectQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		connectQueue.process(maxJobsPerWorker, async (job, done) => connect(job, done));
		connectQueue.on('completed', (job, result) => log(job.id, result));
		connectQueue.close();
	
		let registerQueue = new Queue('register', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		registerQueue.process(maxJobsPerWorker, async (job, done) => register(job, done));
		registerQueue.on('completed', (job, result) => log(job.id, result));
	
		let recordsQueue = new Queue('user-sf-sync', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		recordsQueue.process(maxJobsPerWorker, async (job, done) => sfsync(job, done));
		recordsQueue.on('completed', (job, result) => log(job.id, result));
	
		let responseQueue = new Queue('responses', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		responseQueue.process(maxJobsPerWorker, async (job, done) => sendResponses(job, done));
		responseQueue.on('completed', (job, result) => log(job.id, result));
	
		let deleteResponseQueue = new Queue('delete-responses', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		deleteResponseQueue.process(maxJobsPerWorker, async (job, done) => deleteResponses(job, done));
		deleteResponseQueue.on('completed', (job, result) => log(job.id, result));
	
		let answerQueue = new Queue('answers', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
		answerQueue.process(maxJobsPerWorker, async (job, done) => sendAnswers(job, done));
		answerQueue.on('completed', (job, result) => log(job.id, result));
	} catch (error) {
		console.log('error', error); 
	}

}

throng({ workers, start });