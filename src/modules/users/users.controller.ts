import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Patch,
	Post,
	UseInterceptors
} from '@nestjs/common'
import { ChangeRoleAdminDto } from './dto/change-role-admin.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { CurrentUser } from '../auth/decorators/current-user.decorator'
import { IsPublic } from '../auth/decorators/is-public.decorator'
import { UpdateUserDto } from './dto/update-user.dto'
import { UpdateUserPasswordDto } from './dto/update-user-password.dto'
import { UserFromJwt } from '../auth/models/user-from-jwt'
import { UsersService } from './users.service'
import { Roles } from './decorators/roles.decorator'
import { Role } from './enums/role.enum'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@IsPublic()
	@Post()
	async create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@IsPublic()
	@Post('role/admin')
	async changeRoleAdminDto(@Body() changeRoleAdminDto: ChangeRoleAdminDto) {
		return this.usersService.changeRoleAdmin(changeRoleAdminDto)
	}

	@Roles(Role.USER)
	@Patch('me')
	async update(
		@CurrentUser() user: UserFromJwt,
		@Body() updateUserDto: UpdateUserDto
	) {
		return this.usersService.update(user.id, updateUserDto)
	}

	@Roles(Role.USER)
	@Patch('me/password')
	async updatePassword(
		@CurrentUser() user: UserFromJwt,
		@Body() updateUserPasswordDto: UpdateUserPasswordDto
	) {
		return this.usersService.updatePassword(user.id, updateUserPasswordDto)
	}
}
