import { EntityRepository, Repository } from 'typeorm';
import { Image } from '../entities/image.entity';

@EntityRepository(Image)
export class ImagesRepository extends Repository<Image> {
  // Todo 이미지 경로 저장 레포 만들기

  saveProductImagePath(files, product) {
    return Promise.all(
      files.map(async (el) => await this.save({ imgUrl: el.path, product })),
    );
  }
}
