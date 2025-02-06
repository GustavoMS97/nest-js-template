import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { FindOptionsWhere, Repository } from 'typeorm'

import { UserRepositoryInterface } from '@app/modules/user/interface/user-repository.interface'
import { UserEntity } from '@app/modules/user/user.entity'

@Injectable()
export default class UserRepository implements UserRepositoryInterface {
  constructor(
    @InjectRepository(UserEntity)
    private repository: Repository<UserEntity>
  ) {}

  async create(data: UserEntity): Promise<UserEntity> {
    return await this.repository.save(data)
  }

  async findOne(
    filter: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
    fields?: (keyof UserEntity)[],
    populate?: (keyof UserEntity)[] | undefined,
    order?: { [K in keyof UserEntity]?: 'ASC' | 'DESC' }
  ): Promise<UserEntity | null> {
    return await this.repository.findOne({ where: filter, select: fields, relations: populate, order })
  }

  async find(
    filter: FindOptionsWhere<UserEntity>,
    fields?: (keyof UserEntity)[],
    populate?: (keyof UserEntity)[] | undefined,
    order?: { [K in keyof UserEntity]?: 'ASC' | 'DESC' }
  ): Promise<UserEntity[] | null> {
    return await this.repository.find({ where: filter, select: fields, relations: populate, order })
  }

  async updateById(id: number, data: Partial<UserEntity>): Promise<boolean> {
    const result = await this.repository.update({ id }, data)
    return !!result.affected
  }
}
