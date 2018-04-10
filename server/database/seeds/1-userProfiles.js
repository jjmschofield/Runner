const faker = require('faker');
const config = require('../config/seedConfig');

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('users.user_profiles').del()
        .then(function () {
            // Inserts seed entries
            return knex.batchInsert('users.user_profiles', generateProfiles(config.numberOfUsers));
        });
};

function generateProfiles(numberOfUsers){

    const userProfiles = [];

    for (i = 0; i < numberOfUsers; i++) {
        userProfiles.push({
            user_id: i,
            'given_name': faker.name.firstName(),
            'family_name': faker.name.lastName(),
            'avatar_url': faker.image.avatar(),
            'dob': faker.date.between('1930-01-01', '2002-01-01'),
        });
    }

    return userProfiles;
}
