const faker = require('faker');
const config = require('../config/seedConfig');

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users.user_bios').del()
        .then(function () {
            // Inserts seed entries
            return knex.batchInsert('users.user_bios', generateBios(config.numberOfUsers));
        });
};

function generateBios(numberOfUsers){

    const userProfiles = [];

    for (i = 0; i < numberOfUsers; i++) {
        userProfiles.push({
            user_id: i,
            weight_grams: faker.random.number({min:40000, max:170000}),
        });
    }

    return userProfiles;
}
