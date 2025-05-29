import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { DatabaseConfig } from './shared/database/database.config'
import { DatabaseService } from './shared/database/database.service'
import { UsersModule } from './modules/users/users.module'
import { AuthModule } from './modules/auth/auth.module'
import { RolesGuard } from './modules/users/guards/roles.guard'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './modules/auth/guards/jwt-auth.guard'
import { TasksModule } from './modules/tasks/tasks.module'

@Module({
	imports: [
		ConfigModule.forRoot(),
		TypeOrmModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) =>
				DatabaseConfig.createTypeOrmOptions(configService),
			inject: [ConfigService]
		}),
		UsersModule,
		AuthModule,
		TasksModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: JwtAuthGuard
		},
		{
			provide: APP_GUARD,
			useClass: RolesGuard
		},
		DatabaseService
	]
})
export class AppModule {}
