import { ConfigService } from '@nestjs/config'
import { TypeOrmModuleOptions } from '@nestjs/typeorm'

import { User } from '@/modules/users/entities/user.entity'
import { Task } from '@/modules/tasks/entities/task.entity'

export class DatabaseConfig {
	static createTypeOrmOptions(
		configService: ConfigService
	): TypeOrmModuleOptions {
		return {
			type: 'postgres',
			url: configService.get('DATABASE_URL'),
			ssl: false,
			useUTC: true,
			entities: [User, Task],
			synchronize: true,
			connectTimeoutMS: 30000,
			logging: false,
			migrationsRun: false,
			migrations: ['src/shared/database/migrations/*.ts']
		}
	}
}
