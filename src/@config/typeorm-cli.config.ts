import { join } from 'path'

import * as dotenv from 'dotenv'
import { DataSource, DataSourceOptions } from 'typeorm'

dotenv.config()

const connectionSource = new DataSource({
  type: 'mysql',
  entities: [join(__dirname, '../modules/**/*.entity.{.ts,.js}')],
  migrations: [join(__dirname, '../@migrations/*{.ts,.js}')],
  synchronize: false,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT ?? '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : false
} as DataSourceOptions)

export default connectionSource
