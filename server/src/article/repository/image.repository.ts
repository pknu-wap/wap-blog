import { EntityRepository, Repository } from 'typeorm';
import { Image } from '@/article/entity';

@EntityRepository(Image)
export class ImageRepository extends Repository<Image> {

}