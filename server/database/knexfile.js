const dotenv = require('dotenv');
const path = require('path');

if (!dbEnvVarsLoaded()) {
    dotenv.config({ path: path.join(__dirname, '../.env') });
    if(!dbEnvVarsLoaded()) throw new Error('DB migration is missing required env vars');
}

module.exports = {
    client: 'pg',
    connection: {
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        user: process.env.DB_MIGRATION_USER,
        password: process.env.DB_MIGRATION_PASSWORD
    },
    migrations: {
        tableName: 'knex_migrations'
    }
};

function dbEnvVarsLoaded() {
    return process.env.DB_HOST &&
        process.env.DB_NAME &&
        process.env.DB_MIGRATION_USER &&
        process.env.DB_MIGRATION_PASSWORD;
}
