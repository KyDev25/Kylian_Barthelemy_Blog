export const up = async (db) => {
  await db.schema.createTable("users", (table) => {
    table.increments("id")
    table.text("email").notNullable()
    table.text("firstName").notNullable()
    table.text("lastName").notNullable()
    table.text("passwordHash").notNullable()
    table.text("passwordSalt").notNullable()
    table.boolean("isAdmin").defaultTo(false)
    table.boolean("isAuthor").defaultTo(false)
    table.boolean("isActive").defaultTo(true)
    table.timestamps(true, true, true)
    table.timestamp("deletedAt")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("users")
}
