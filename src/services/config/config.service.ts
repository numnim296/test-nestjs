import { Injectable } from '@nestjs/common'
import { ConfigService as NestConfigService } from '@nestjs/config'

@Injectable()
export class ConfigService extends NestConfigService {
  get isProduction() {
    return this.get('NODE_ENV') === 'production'
  }

  get isDevelopment() {
    return this.get('NODE_ENV') === 'development'
  }
}
