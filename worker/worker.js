let throng = require('throng');
let Queue = require("bull");

let PORT = '10579';
let HOST = 'ec2-54-205-115-98.compute-1.amazonaws.com';
let PASSWORD = 'p3b2f0b8e50eb4fca2646a65350018b26f04d1cbb8074c2a20475936bec4b1da1';

let workers = process.env.WEB_CONCURRENCY || 2;

let maxJobsPerWorker = 50;

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function start() {
  // Connect to the named work queue
	let workQueue = new Queue('connect', {redis: {port: PORT, host: HOST, password: PASSWORD }}); 

  workQueue.process(maxJobsPerWorker, async (job) => {

    let progress = 0;

    // throw an error 5% of the time
    if (Math.random() < 0.05) {
      throw new Error("This job failed!")
    }

    while (progress < 100) {
      await sleep(50);
      progress += 1;
      job.progress(progress)
    }

    // A job can return values that will be stored in Redis as JSON
    // This return value is unused in this demo application.
    return { value: "This will be stored" };
  });
}

// Initialize the clustered worker process
// See: https://devcenter.heroku.com/articles/node-concurrency for more info
throng({ workers, start });