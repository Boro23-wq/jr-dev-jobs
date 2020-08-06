var cron = require('node-cron');

const fetchGithub = require('./tasks/fetch-github');

cron.schedule('*/1 * * * *', fetchGithub);
