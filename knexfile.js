require('dotenv').config()

module.exports = {
  // development: {
  //   client: 'pg',
  //   version: '12.4',
  //   connection: {
	//     host : 'localhost',
	//     user : 'usertest',
	//     password : '111111',
	//     database : 'mobx',
	//     //timezone: 'UTC',
  //     //dateStrings: true
  // 	},
  // 	pool: {
  //     min: 2,
  //     max: 10,
  //   },
  //   migrations: {
  //     tableName: 'migrations',
  //     directory: './db/migrations',
  //   },
  //   seeds: {
  //     directory: './db/seeds',
  //   }
  // },

  production: {
    client: 'pg',
    version: '12.4',
    connection: {
	    host : process.env.DB_HOST,
	    user : process.env.DB_USER,
	    password : process.env.DB_PASSWORD,
	    database : process.env.DB
  	},
  	pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'migrations',
      directory: './db/migrations',
    },
    seeds: {
      directory: './db/seeds',
    }
  },

};