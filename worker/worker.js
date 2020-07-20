import throng from 'throng';
import Queue from 'bull';
import { log } from './helpers/log';
import { connect } from './consumer/connect';
import { register } from './consumer/register';
import { sendAnswers } from './consumer/answers';
import { sendResponses, deleteResponses } from './consumer/responses';
import { sfsync } from './consumer/sfsync';

let PORT = '21489';
let HOST = 'ec2-67-202-25-98.compute-1.amazonaws.com';
let PASSWORD = 'pa52ef8b5d034514d7e08a40ae7be9213d85032d1255a43b6393b948832e172cd';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function start() {
	//with more queues we can loop through these for failed completed stalled and process
	//maybe separate by orgid + Connect or an extra identifier

	let connectQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	console.log('connectQueue', connectQueue); 
	connectQueue.process(maxJobsPerWorker, async (job, done) => connect(job, done));
	connectQueue.on('completed', (job, result) => log(job.id, result));
	connectQueue.close();

	// let registerQueue = new Queue('register', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	// registerQueue.process(maxJobsPerWorker, async (job, done) => register(job, done));
	// registerQueue.on('completed', (job, result) => log(job.id, result));

	// let recordsQueue = new Queue('user-sf-sync', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	// recordsQueue.process(maxJobsPerWorker, async (job, done) => sfsync(job, done));
	// recordsQueue.on('completed', (job, result) => log(job.id, result));

	// let responseQueue = new Queue('responses', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	// responseQueue.process(maxJobsPerWorker, async (job, done) => sendResponses(job, done));
	// responseQueue.on('completed', (job, result) => log(job.id, result));

	// let deleteResponseQueue = new Queue('delete-responses', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	// deleteResponseQueue.process(maxJobsPerWorker, async (job, done) => deleteResponses(job, done));
	// deleteResponseQueue.on('completed', (job, result) => log(job.id, result));

	// let answerQueue = new Queue('answers', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 
	// answerQueue.process(maxJobsPerWorker, async (job, done) => sendAnswers(job, done));
	// answerQueue.on('completed', (job, result) => log(job.id, result));

}

throng({ workers, start });