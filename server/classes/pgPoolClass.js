const pgPool = require('pg').Pool;

class Pool {
  constructor() {
    this.client = new pgPool({
      user: 'postgres1',
      host: '127.0.0.1',
      database: 'postgres',
      password: 'changeme',
      port: 5432,
    });

    this.client.connect(function(err) {
      if (err) throw err;
      console.log("Connected!");
    });
  };

  query(queryString, queryParams) {
    return new Promise((resolve, reject) => {
      this.client.query(queryString, queryParams, (err, res) => {
        if (err) {
          reject(err);
        };
        resolve(res);
      });
    });
  };
};

module.exports = new Pool();