exports.up = function(knex, Promise) {
    return knex.schema.withSchema('users').createTable('user_bios', (table) => {
        table.integer('user_id').primary().unique();
        table.foreign('user_id').references('id').inTable('users.users').onDelete('CASCADE');
        table.integer('weight_grams');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.withSchema('users').dropTable('user_bios');
};
