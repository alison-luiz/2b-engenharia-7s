import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Request,
	ClassSerializerInterceptor,
	UseInterceptors
} from '@nestjs/common'
import { TasksService } from './tasks.service'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { Role } from '../users/enums/role.enum'
import { Roles } from '../users/decorators/roles.decorator'

@UseInterceptors(ClassSerializerInterceptor)
@Controller('tasks')
export class TasksController {
	constructor(private readonly tasksService: TasksService) {}

	@Post()
	@Roles(Role.USER)
	create(@Body() createTaskDto: CreateTaskDto, @Request() req) {
		return this.tasksService.create(createTaskDto, req.user.id)
	}

	@Get()
	@Roles(Role.USER)
	findAll(@Request() req) {
		return this.tasksService.findAll(req.user.id)
	}

	@Get(':id')
	@Roles(Role.USER)
	findOne(@Param('id') id: string, @Request() req) {
		return this.tasksService.findOne(id, req.user.id)
	}

	@Patch(':id')
	@Roles(Role.USER)
	update(
		@Param('id') id: string,
		@Body() updateTaskDto: UpdateTaskDto,
		@Request() req
	) {
		return this.tasksService.update(id, updateTaskDto, req.user.id)
	}

	@Delete(':id')
	@Roles(Role.ADMIN)
	remove(@Param('id') id: string, @Request() req) {
		return this.tasksService.remove(id, req.user.id)
	}
}
