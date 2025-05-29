import { IsString, IsOptional, IsDateString, IsBoolean } from 'class-validator'

export class UpdateTaskDto {
	@IsString()
	@IsOptional()
	title?: string

	@IsString()
	@IsOptional()
	description?: string

	@IsDateString()
	@IsOptional()
	dueDate?: Date

	@IsBoolean()
	@IsOptional()
	completed?: boolean
}
