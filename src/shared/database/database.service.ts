import { Injectable } from '@nestjs/common'
import { InjectDataSource } from '@nestjs/typeorm'
import { DataSource } from 'typeorm'

@Injectable()
export class DatabaseService {
	constructor(@InjectDataSource() private readonly dataSource: DataSource) {}

	async synchronizeAndRunMigrations(): Promise<void> {
		await this.dataSource.synchronize()
		await this.dataSource.runMigrations()
	}
}
