export class PaginationWrapper<T> {
  results: T[];
  count: number;
  page: number;
}

export class PaginationParams {
  page: number;
  limit: number;
}
