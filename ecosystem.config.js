module.exports = {
  apps : [{
    name: 'bp-server',
    cwd: '.',
    script: './dist/server.js',
    watch: true,
    source_map_support: true,
    exec_mode: 'cluster',
    instances: 3,
    instance_var: 'INSTANCE_ID',
    env: {
      NODE_ENV: 'development',
    },
    env_production: {
      NODE_ENV: 'production',
    },
  }],
};
