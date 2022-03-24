const { Pool } = require('pg');

try {
    require('dotenv').config();
} catch (e) { }

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
    connectionString: connectionString,
    ssl: connectionString.includes('localhost') ? false : {
        rejectUnauthorized: false
    }
});

module.exports = pool;