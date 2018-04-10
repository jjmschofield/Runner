const config = require('../config/seedConfig');

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users.users').del()
        .then(function () {
            // Inserts seed entries
            return knex.batchInsert('users.users', generateUsers(config.numberOfUsers));
        });
};

function generateUsers(numberOfUsers){

    const users = [];

    for (i = 0; i < numberOfUsers; i++) {
        users.push({id: i})
    }

    return users;
}
