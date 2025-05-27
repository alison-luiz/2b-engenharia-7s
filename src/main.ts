import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { DatabaseService } from './shared/database/database.service'
import { ValidationPipe } from '@nestjs/common'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)

	app.useGlobalPipes(
		new ValidationPipe({
			whitelist: true,
			forbidNonWhitelisted: true,
			forbidUnknownValues: true,
			transform: true
		})
	)
	app.enableCors()

	const databaseService = app.get(DatabaseService)
	await databaseService.synchronizeAndRunMigrations()

	await app.listen(process.env.PORT ?? 3000)
}
bootstrap()
