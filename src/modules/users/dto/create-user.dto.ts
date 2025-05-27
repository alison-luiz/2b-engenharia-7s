import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator'

export class CreateUserDto {
	@IsString()
	firstName: string

	@IsString()
	lastName: string

	@IsEmail()
	@IsString()
	email: string

	@IsString()
	@MinLength(4)
	@MaxLength(20)
	password: string
}
