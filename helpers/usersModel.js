const db = require('../data/db-config.js');

module.exports = {
    find,
    findBy,
    findById,
    add
}
/// knex SQL functions for the users database

function find() {
    return db('users').select('id', 'firstname', 'lastname', 'email', 'password');
}

function findBy(filter) {
    console.log(filter)
    return db('users').where(filter);
}

function findById(id) {
    return db('users').where({ id }).first();
}

function add(user) {
    return db('users')
      .insert(user, 'id')
      .then(ids => {
        const [id] = ids;
        return findById(id);
      });
  }