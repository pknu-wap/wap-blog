import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  @Entity()
  export class ArticleImage {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    fk_article_id: number;

    @Column()
    fk_user_id: number;
  }