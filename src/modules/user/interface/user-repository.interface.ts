import { FindOptionsWhere } from 'typeorm'

import { RepositoryInterface } from '@app/modules/@shared/interface/repository.interface'
import { UserEntity } from '@app/modules/user/user.entity'

export interface UserRepositoryInterface extends RepositoryInterface<UserEntity> {
  create(data: UserEntity): Promise<UserEntity>
  findOne(
    filter: FindOptionsWhere<UserEntity> | FindOptionsWhere<UserEntity>[],
    fields?: (keyof UserEntity)[],
    populate?: (keyof UserEntity)[] | undefined,
    order?: { [K in keyof UserEntity]?: 'ASC' | 'DESC' }
  ): Promise<UserEntity | null>
  find(
    filter: FindOptionsWhere<UserEntity>,
    fields?: (keyof UserEntity)[],
    populate?: (keyof UserEntity)[] | undefined,
    order?: { [K in keyof UserEntity]?: 'ASC' | 'DESC' }
  ): Promise<UserEntity[] | null>
  updateById(id: number, data: Partial<UserEntity>): Promise<boolean>
}
