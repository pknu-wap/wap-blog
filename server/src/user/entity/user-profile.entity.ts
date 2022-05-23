import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  import { Article } from '@/article/entity';
  
  @Entity()
  export class UserImage {
  }