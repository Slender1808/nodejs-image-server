module.exports = [{
  script: './server.js',
  name: 'server image',
  exec_mode: 'cluster',
  instances: process.env.INSTANCES
}]