exports.up = knex => knex.schema.createTable("dishes", table => {
  table.increments("id");
  table.text("dish_name").notNullable();
  table.text("description").notNullable();
  table.text("category").notNullable();
  table.text("dish_image").default(null);
  table.decimal("price", 10, 2).notNullable();
  table.integer("user_id")
    .unsigned()
    .references("id").inTable("users")
    .onDelete("SET NULL");
  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
  table.timestamp("created_by")
    .references("id").inTable("users")
    .onDelete("SET NULL");
  table.timestamp("updated_by")
    .references("id").inTable("users")
    .onDelete("SET NULL");
});

exports.down = knex => knex.schema.dropTable("dishes");