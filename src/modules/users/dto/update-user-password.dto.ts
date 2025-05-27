import { IsString, MaxLength, MinLength } from 'class-validator'

export class UpdateUserPasswordDto {
	@IsString()
	@MinLength(4)
	@MaxLength(20)
	oldPassword: string

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	newPassword: string
}
