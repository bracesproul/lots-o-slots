import { Connection as RelayConnection } from 'graphql-relay';

export interface Connection<T> extends RelayConnection<T> {
  readonly count: number;

  readonly totalCount: number;

  readonly nodes: T[] | null;
}
