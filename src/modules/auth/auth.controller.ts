import {
	Body,
	ClassSerializerInterceptor,
	Controller,
	Post,
	Request,
	UseGuards,
	UseInterceptors
} from '@nestjs/common'
import { AuthService } from './auth.service'
import { IsPublic } from './decorators/is-public.decorator'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { AuthRequest } from './models/auth-request'
import { LoginRequestBody } from './models/login-request-body'

@UseInterceptors(ClassSerializerInterceptor)
@Controller()
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@IsPublic()
	@UseGuards(LocalAuthGuard)
	@Post('login')
	async login(
		@Request() req: AuthRequest,
		@Body() loginRequestBody: LoginRequestBody
	) {
		return this.authService.login(req.user, loginRequestBody)
	}
}
