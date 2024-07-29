const Queue = require('bull');

const jobQueue = new Queue('jobQueue', {
    redis: {
        host: '127.0.0.1',
        port: 6379
    }
});

jobQueue.process(async (job) => {
    // Lógica para procesar el trabajo
    console.log(`Procesando trabajo con datos: ${job.data}`);
});

module.exports = jobQueue;

const jobQueue = require('../queues/jobQueue');


jobQueue.add({ type: 'sendEmail', email: 'example@example.com' });