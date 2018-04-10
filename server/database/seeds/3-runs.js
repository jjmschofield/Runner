const faker = require('faker');
const config = require('../config/seedConfig');

exports.seed = function (knex, Promise) {
    // Deletes ALL existing entries
    return knex('activities.runs').del()
        .then(function () {
            // Inserts seed entries
            return knex.batchInsert('activities.runs', generateProfiles(config.numberOfUsers, config.runsPerUser));
        });
};

function generateProfiles(numberOfUsers, runsPerUser) {

    const runs = [];

    for (let i = 0; i < numberOfUsers; i++) {
        const numberOfRuns = faker.random.number(runsPerUser);

        for (let j = 0; j < numberOfRuns; j++) {
            runs.push({
                user_id: i,
                date: faker.date.between('2017-01-01', '2018-01-01'),
                distance_meters: faker.random.number({ max: 24000, min: 0 }),
                duration_seconds: faker.random.number({ max: 18000, min: 0 })
            });
        }
    }

    return runs;
}
