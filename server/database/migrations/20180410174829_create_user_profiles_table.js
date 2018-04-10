exports.up = function(knex, Promise) {
    return knex.schema.withSchema('users').createTable('user_profiles', (table) => {
        table.integer('user_id').primary().unique();
        table.foreign('user_id').references('id').inTable('users.users').onDelete('CASCADE');

        table.string('given_name', 25);
        table.string('family_name', 50);
        table.string('avatar_url', 100);
        table.date('dob');

        table.timestamps(true, true);
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.withSchema('users').dropTable('user_profiles');
};
