exports.up = function(knex, Promise) {
    return knex.schema.withSchema('users').createTable('users', (table) => {
        table.increments('id').primary().unique();
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.withSchema('users').dropTable('users');
};
