import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { User } from '@/modules/users/entities/user.entity'

export class DatabaseConfig {
	static createTypeOrmOptions(
		configService: ConfigService
	): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: configService.get('DATABASE_URL'),
			ssl: false,
			useUTC: true,
			entities: [User],
			synchronize: true,
			connectTimeoutMS: 30000,
			logging: false,
			migrationsRun: false,
			migrations: ['src/shared/database/migrations/*.ts']
		}
	}
}
