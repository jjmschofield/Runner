const fs = require('fs');
const caller = require('caller');


module.exports = {
    getUpSql: () =>{
        const migration = caller();
        const scriptFile = migration.replace('.js', '_up.sql');
        return fs.readFileSync(scriptFile, 'utf8');

    },
    getDownSql: () =>{
        const migration = caller();
        const scriptFile = migration.replace('.js', '_down.sql');
        return fs.readFileSync(scriptFile, 'utf8');
    },
};
