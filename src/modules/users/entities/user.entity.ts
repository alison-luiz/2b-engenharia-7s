import { Exclude } from 'class-transformer'
import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm'
import { Role } from '../enums/role.enum'
import { Task } from '@/modules/tasks/entities/task.entity'

@Entity('users')
export class User {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	firstName: string

	@Column()
	lastName: string

	@Column({ unique: true })
	email: string

	@Exclude()
	@Column()
	password: string

	@Column({
		type: 'enum',
		enum: Role,
		array: true,
		default: [Role.USER]
	})
	roles: Role[]

	@OneToMany(() => Task, (task) => task.user)
	tasks: Task[]
}
