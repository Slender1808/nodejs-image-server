module.exports = {
  apps : [{
    name: "Image Serve",
    script: "./server.js",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
//pm2 start ecosystem.config.js