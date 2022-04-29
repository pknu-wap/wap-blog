import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Article {
    @ApiProperty()
    @PrimaryGeneratedColumn()
    id: number;

    @ApiProperty()
    @Column()
    writer: string;

    @ApiProperty()
    @Column()
    classify: string;

    @ApiProperty()
    @Column()
    title: string;

    @ApiProperty()
    @Column()
    description: string;

    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;

    @ApiProperty()
    @UpdateDateColumn()
    updateddAt: Date;

    @ApiProperty()
    @DeleteDateColumn()
    deletedAt: Date;
}
