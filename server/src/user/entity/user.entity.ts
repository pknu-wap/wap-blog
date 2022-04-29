import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @ApiProperty()
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @ApiProperty()
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @ApiProperty()
  @Column()
  password: string;

  @ApiProperty()
  @Column({ nullable: true })
  hashedRt: string;

  @ApiProperty()
  @CreateDateColumn('timestampz')
  createdAt: Date;

  @ApiProperty()
  @UpdateDateColumn('timestampz')
  updateAt: Date;
}
