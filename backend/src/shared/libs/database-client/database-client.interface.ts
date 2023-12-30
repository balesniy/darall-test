export interface DatabaseClient {
  connect(): Promise<void>;
  disconnect(): Promise<void>;
}

export interface CRUDRepository<E, I, R> {
  findById(id: I): Promise<R | null>;
  create(item: E): Promise<R>;
  update(id: I, item: Partial<E>): Promise<R>;
  destroy(id: I): Promise<void>;
}

export interface Entity<T> {
  toObject(): T;
  fillEntity(entity: T): void;
}

// export type EntityIdType = number | string;
//
// export interface Entity<T extends EntityIdType> {
//   id: T;
//   toPOJO(): Record<string, unknown>
// }
//
// export interface Repository<T extends Entity<EntityIdType>> {
//   findById(id: T['id']): Promise<T | null>;
//   save(entity: T): Promise<T>;
//   update(id: T['id'], entity: T): Promise<T>;
//   deleteById(id: T['id']): Promise<void>;
// }
