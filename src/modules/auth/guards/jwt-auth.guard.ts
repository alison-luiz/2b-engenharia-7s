import { ExecutionContext, HttpStatus, Injectable } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { AuthGuard } from '@nestjs/passport'
import { IS_PUBLIC_KEY } from '../decorators/is-public.decorator'
import { AppError } from '@/shared/utils/appError.exception'

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
	constructor(private reflector: Reflector) {
		super()
	}

	canActivate(context: ExecutionContext): Promise<boolean> | boolean {
		const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
			context.getHandler(),
			context.getClass()
		])
		if (isPublic) {
			return true
		}
		const canActivate = super.canActivate(context)
		if (typeof canActivate === 'boolean') {
			return canActivate
		}
		const canActivatePromise = canActivate as Promise<boolean>
		return canActivatePromise.catch((error) => {
			throw new AppError({
				id: 'ERROR_AUTHENTICATING_USER',
				message: 'Error authenticating user',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		})
	}
}
