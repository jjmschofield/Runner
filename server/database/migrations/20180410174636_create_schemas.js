const {getUpSql, getDownSql} = require('../utils/sqlHelpers');

exports.up = function(knex, Promise) {
    const sql = getUpSql();
    return knex.raw(sql);
};

exports.down = function(knex, Promise) {
    const sql = getDownSql();
    return knex.raw(sql);
};
