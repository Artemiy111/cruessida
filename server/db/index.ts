import { drizzle } from 'drizzle-orm/better-sqlite3'
import Database from 'better-sqlite3'

import * as schema from './schema'

export const db = drizzle({
  client: new Database('db.sqlite3'),
  schema,
  casing: 'snake_case'
})
