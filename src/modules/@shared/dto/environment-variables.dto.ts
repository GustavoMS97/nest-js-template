import { Expose } from 'class-transformer'
import { IsBoolean, IsEmail, IsEnum, IsNumber, IsOptional, IsPort, IsString } from 'class-validator'

export enum NODE_ENV {
  LOCAL = 'local',
  DEV = 'development',
  TEST = 'test',
  STG = 'staging',
  PRD = 'production'
}

export class EnvironmentVariablesDto {
  @Expose()
  @IsString()
  @IsEnum(NODE_ENV)
  NODE_ENV: string

  @Expose()
  @IsString()
  PORT: string

  // Db
  @Expose()
  @IsString()
  DB_USER: string

  @Expose()
  @IsString()
  DB_PASS: string

  @Expose()
  @IsString()
  DB_HOST: string

  @Expose()
  @IsString()
  @IsPort()
  DB_PORT: string

  @Expose()
  @IsString()
  DB_NAME: string

  @Expose()
  @IsOptional()
  @IsBoolean()
  DB_SSL?: boolean

  @Expose()
  @IsString()
  JWT_SECRET: string

  @Expose()
  @IsNumber()
  JWT_EXPIRES_IN_SECONDS: number

  @Expose()
  @IsEmail()
  @IsString()
  SUPER_ADMIN_EMAIL: string

  @Expose()
  @IsString()
  SUPER_ADMIN_PASSWORD: string

  @Expose()
  @IsOptional()
  @IsString()
  LOCALE?: string
}
