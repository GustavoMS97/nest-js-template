import { Inject, Injectable, LoggerService, LogLevel } from '@nestjs/common'
import { Logger } from 'winston'

@Injectable()
export default class CustomLoggerService implements LoggerService {
  constructor(@Inject('winston') private readonly logger: Logger) {}

  log(message: string, ...optionalParams: unknown[]): void {
    this.logger.info(message, { ...optionalParams })
  }

  error(message: string, ...optionalParams: unknown[]): void {
    this.logger.error(message, { ...optionalParams })
  }

  warn(message: string, ...optionalParams: unknown[]): void {
    this.logger.warn(message, { ...optionalParams })
  }

  debug(message: string, ...optionalParams: unknown[]): void {
    this.logger.debug(message, { ...optionalParams })
  }

  verbose(message: string, ...optionalParams: unknown[]): void {
    this.logger.verbose(message, { ...optionalParams })
  }

  fatal(message: string, ...optionalParams: unknown[]): void {
    this.logger.log('critical', message, { ...optionalParams })
  }

  setLogLevels(levels: LogLevel[]): void {
    this.logger.level = levels.join(',')
  }
}
