import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

export class DatabaseConfig {
	static createTypeOrmOptions(
		configService: ConfigService
	): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: configService.get('DATABASE_URL'),
			ssl: false,
			useUTC: true,
			entities: [],
			synchronize: true,
			connectTimeoutMS: 30000,
			logging: false,
			migrationsRun: false,
			migrations: ['src/shared/database/migrations/*.ts']
		}
	}
}
