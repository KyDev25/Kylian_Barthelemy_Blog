export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id")
    table.text("article").notNullable()
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.timestamps(true, true, true)
  })
  await db.schema.createTable("comments", (table) => {
    table.increments("id")
    table.text("comment").notNullable()
    table.integer("postId").notNullable()
    table
      .foreign("postId")
      .references("id")
      .inTable("posts")
      .onDelete("CASCADE")
    table.integer("userId").notNullable()
    table
      .foreign("userId")
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
  await db.schema.dropTable("posts")
}
