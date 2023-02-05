require('dotenv').config();
const pgPool = require('pg').Pool;

class Pool {
  constructor() {
    this.client = new pgPool({
      user: process.env.DB_USERNAME,
      host: process.env.DB_HOST,
      database: 'postgres',
      password: process.env.DB_PASSWORD,
      port: process.env.DEV_PORT,
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