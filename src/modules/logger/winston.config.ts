import * as winston from 'winston'

import { EnvironmentConfig } from '@app/@config/environment.config'
import { NODE_ENV } from '@app/modules/@shared/dto/environment-variables.dto'

export function createWinstonConfig(environmentConfig: EnvironmentConfig): winston.LoggerOptions {
  const env = environmentConfig.config.NODE_ENV as NODE_ENV
  const isDev = env === NODE_ENV.DEV || env === NODE_ENV.LOCAL
  const locale = environmentConfig.config.LOCALE ?? 'en-US'
  const timestampWithTimezone = (): string => {
    return new Intl.DateTimeFormat(locale, {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZoneName: 'short'
    }).format(new Date())
  }

  return {
    levels: {
      error: 0,
      warn: 1,
      info: 2,
      http: 3,
      verbose: 4,
      debug: 5,
      silly: 6,
      notice: 2,
      critical: 0,
      alert: 0,
      emergency: 0
    },
    format: !isDev
      ? winston.format.combine(winston.format.timestamp(), winston.format.json())
      : winston.format.combine(
          winston.format.colorize({ all: true }),
          winston.format.timestamp({ format: timestampWithTimezone }),
          winston.format.printf(({ level, message, timestamp }: { level: string; message: string; timestamp: string }) => {
            return `${timestamp} ${level}: ${message}`
          })
        ),
    transports: [new winston.transports.Console({})]
  }
}
