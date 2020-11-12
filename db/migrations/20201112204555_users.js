exports.up = function(knex) {
  return knex.schema.createTable('users', (table) => {
    table.increments('id').primary()
    table.string('googleId').notNullable()
    table.string('refreshToken').notNullable()
    table.timestamp('created_at').defaultTo(knex.fn.now())
    table.unique('googleId')
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('users')
};

