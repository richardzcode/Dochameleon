#!/usr/bin/env node

require('babel-register')({
  babelrc: false,
  only: [__dirname, process.cwd() + '/core'],
  presets: ['react', 'env'],
});

const chalk = require('chalk');
const fs = require('fs');
const commander = require('commander');
const tcpPortUsed = require('tcp-port-used');

const CWD = process.cwd();

if (!fs.existsSync(CWD + '/siteConfig.js')) {
  console.error(
    chalk.red('Error: No siteConfig.js file found in website folder!')
  );
  process.exit(1);
}

commander.option('--port <number>', 'Specify port number').parse(process.argv);
const port = parseInt(commander.port, 10) || 3000;

tcpPortUsed
  .check(port, 'localhost')
  .then(function(inUse) {
    if (inUse) {
      console.error(chalk.red('Port ' + port + ' is in use'));
      process.exit(1);
    } else {
      console.log('Starting Dochameleon server on port ' + port + '...');
      const server = require('./core/server.js');
      server(port);
    }
  })
  .catch(function(ex) {
    setTimeout(function() {
      throw ex;
    }, 0);
  });
