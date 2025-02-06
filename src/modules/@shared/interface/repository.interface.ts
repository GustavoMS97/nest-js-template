import { FindOptionsWhere } from 'typeorm'

export interface RepositoryInterface<T> {
  // If a different DB implementation is needed, just add the type here with |
  find?(
    filter: FindOptionsWhere<T>,
    fields?: (keyof T)[],
    populate?: (keyof T)[] | string[] | undefined,
    order?: { [K in keyof T]?: 'ASC' | 'DESC' }
  ): Promise<T[] | null>
  findOne?(
    filter: FindOptionsWhere<T> | FindOptionsWhere<T>[],
    fields?: (keyof T)[],
    populate?: (keyof T)[] | string[] | undefined,
    order?: { [K in keyof T]?: 'ASC' | 'DESC' }
  ): Promise<T | null>
  findById?(id: string, fields?: (keyof T)[]): Promise<T | null>
  create?(data: T): Promise<T>
  updateById?(id: number, data: Partial<T>): Promise<boolean>
  updateByFilter?(filter: FindOptionsWhere<T>, data: Partial<T>): Promise<boolean>
  deleteByFilter?(filter: FindOptionsWhere<T>): Promise<boolean>
}
