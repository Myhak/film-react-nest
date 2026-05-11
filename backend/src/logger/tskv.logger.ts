import { LoggerService, Injectable } from '@nestjs/common';

@Injectable()
export class TskvLogger implements LoggerService {
  formatMessage(level: string, message: any, ...optionalParams: any[]) {
    const parts = [`level=${level}`, `message=${String(message)}`];
    if (optionalParams.length > 0) {
      parts.push(`optionalParams=${JSON.stringify(optionalParams)}`);
    }
    return parts.join('\t') + '\n';
  }

  log(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('log', message, ...optionalParams));
  }

  error(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('error', message, ...optionalParams));
  }

  warn(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('warn', message, ...optionalParams));
  }

  debug(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('debug', message, ...optionalParams));
  }

  verbose(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('verbose', message, ...optionalParams));
  }

  fatal(message: any, ...optionalParams: any[]) {
    process.stdout.write(this.formatMessage('fatal', message, ...optionalParams));
  }
}
