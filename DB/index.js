const { Pool } = require('../server/node_modules/pg');
require("../server/node_modules/dotenv").config();


const devConfig = {
  user: process.env.PG_USER,
  host: process.env.PG_HOST,
  database: process.env.PG_DATABASE,
  password: process.env.PG_PASSWORD,
  port: process.env.PG_PORT,
};



const pool = new Pool(devConfig);


module.exports = {
  query: (text, params) => pool.query(text, params),
}