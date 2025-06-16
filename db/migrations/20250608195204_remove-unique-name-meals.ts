import type { Knex } from 'knex'

export async function up(knex: Knex): Promise<void> {
  await knex.schema.table('meals', (table) => {
    table.dropUnique(['name'])
  })
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.table('meals', (table) => {
    table.unique('name')
  })
}
