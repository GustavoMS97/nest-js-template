import { INestApplication } from '@nestjs/common'
import { DataSource, QueryRunner } from 'typeorm'

export const E2E_INTERNAL_API_KEY = 'test-api-key'

const envSetup = (): void => {
  process.env.NODE_ENV = 'test'
  process.env.PORT = '3000'
  // db - environment variables are set in .env or github actions
}

const setup = async (): Promise<void> => {
  envSetup()
}

export class E2eHelper {
  constructor(
    private readonly dataSource: DataSource,
    private readonly queryRunner: QueryRunner,
    private readonly app: INestApplication<any>
  ) {}

  async beforeEach(): Promise<void> {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    this.dataSource.manager.queryRunner = this.queryRunner
    await this.queryRunner.startTransaction()
  }

  async afterEach(): Promise<void> {
    await this.queryRunner.rollbackTransaction()
  }

  async afterAll(): Promise<void> {
    await this.queryRunner.release()
    await this.dataSource.destroy()
    await this.app.close()
  }
}

export default setup
