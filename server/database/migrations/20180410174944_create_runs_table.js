exports.up = function(knex, Promise) {
    return knex.schema.withSchema('activities').createTable('runs', (table) => {
        table.increments('id').primary().unique();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users.users').onDelete('CASCADE');
        table.date('date');
        table.integer('distance_meters');
        table.integer('duration_seconds');
        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.withSchema('activities').dropTable('runs');
};
