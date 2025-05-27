import { IsNotEmpty, IsString } from 'class-validator'

export class ChangeRoleAdminDto {
	@IsNotEmpty()
	@IsString()
	email: string

	@IsNotEmpty()
	@IsString()
	secretAdminKey: string
}
