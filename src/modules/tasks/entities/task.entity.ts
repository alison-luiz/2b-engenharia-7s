import { User } from '@/modules/users/entities/user.entity'
import {
	Entity,
	PrimaryGeneratedColumn,
	Column,
	ManyToOne,
	CreateDateColumn,
	UpdateDateColumn
} from 'typeorm'

@Entity('tasks')
export class Task {
	@PrimaryGeneratedColumn('uuid')
	id: string

	@Column()
	title: string

	@Column()
	description: string

	@Column({ default: false })
	completed: boolean

	@Column({ type: 'date' })
	dueDate: Date

	@ManyToOne(() => User, (user) => user.tasks)
	user: User

	@CreateDateColumn()
	createdAt: Date

	@UpdateDateColumn()
	updatedAt: Date
}
