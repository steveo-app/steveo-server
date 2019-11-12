const faker = require('faker');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // dummy user entry
      return knex('users').insert([
        {
          id: 1, 
          firstname: 'John', 
          lastname: 'Smith', 
          email: 'FakeEmail5@gmail.com',
          password: faker.internet.password()
        }
      ]);
    });
};
