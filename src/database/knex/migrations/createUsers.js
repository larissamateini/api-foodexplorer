exports.up = knex => knex.schema.createTable("users", table => {
  table.increments("id");
  table.text("name").notNullable();
  table.text("email").notNullable();
  table.text("password").notNullable();

  //enum ("nome da coluna", [opções que a coluna pode receber]), { propriedade, nome da restrição criada}: restrição de opções
  table
    .enum("role", ["admin", "user"], { useNative: true, enumName: "roles"})
    .notNullable().default("user");

  table.timestamp("created_at").default(knex.fn.now());
  table.timestamp("updated_at").default(knex.fn.now());
});

exports.down = knex => knex.schema.dropTable("users");