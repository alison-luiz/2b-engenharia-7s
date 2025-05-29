import { Injectable, HttpStatus } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Task } from './entities/task.entity'
import { CreateTaskDto } from './dto/create-task.dto'
import { UpdateTaskDto } from './dto/update-task.dto'
import { AppError } from '../../shared/utils/appError.exception'
import { User } from '../users/entities/user.entity'

@Injectable()
export class TasksService {
	constructor(
		@InjectRepository(Task)
		private readonly taskRepository: Repository<Task>,
		@InjectRepository(User)
		private readonly userRepository: Repository<User>
	) {}

	async create(createTaskDto: CreateTaskDto, userId: string) {
		const user = await this.userRepository.findOneBy({ id: userId })
		if (!user) {
			throw new AppError({
				id: 'ERROR_USER_NOT_FOUND',
				message: 'User not found',
				status: HttpStatus.NOT_FOUND
			})
		}

		try {
			const task = this.taskRepository.create({
				...createTaskDto,
				user
			})
			return await this.taskRepository.save(task)
		} catch (error) {
			throw new AppError({
				id: 'ERROR_CREATE_TASK',
				message: 'Error creating task',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		}
	}

	async findAll(userId: string) {
		try {
			return await this.taskRepository.find({
				where: { user: { id: userId } },
				relations: ['user']
			})
		} catch (error) {
			throw new AppError({
				id: 'ERROR_FIND_TASKS',
				message: 'Error finding tasks',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		}
	}

	async findOne(id: string, userId: string) {
		try {
			const task = await this.taskRepository.findOne({
				where: { id, user: { id: userId } },
				relations: ['user']
			})

			if (!task) {
				throw new AppError({
					id: 'ERROR_TASK_NOT_FOUND',
					message: 'Task not found',
					status: HttpStatus.NOT_FOUND
				})
			}

			return task
		} catch (error) {
			if (error instanceof AppError) throw error
			throw new AppError({
				id: 'ERROR_FIND_TASK',
				message: 'Error finding task',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		}
	}

	async update(id: string, updateTaskDto: UpdateTaskDto, userId: string) {
		const task = await this.findOne(id, userId)

		try {
			const updatedTask = this.taskRepository.merge(task, updateTaskDto)
			return await this.taskRepository.save(updatedTask)
		} catch (error) {
			throw new AppError({
				id: 'ERROR_UPDATE_TASK',
				message: 'Error updating task',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		}
	}

	async remove(id: string, userId: string) {
		const task = await this.findOne(id, userId)

		try {
			await this.taskRepository.remove(task)
			return { message: 'Task deleted successfully' }
		} catch (error) {
			throw new AppError({
				id: 'ERROR_DELETE_TASK',
				message: 'Error deleting task',
				status: HttpStatus.INTERNAL_SERVER_ERROR,
				error
			})
		}
	}
}
