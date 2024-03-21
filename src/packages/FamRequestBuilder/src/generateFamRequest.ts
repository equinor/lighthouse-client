import { Connective, Expression, FamRequest, Pagination } from './types';

export function generateFamRequest(
  columnNames: string[],
  connective: Connective,
  expressions: Expression[],
  pagination?: Pagination
): FamRequest {
  const req: FamRequest = {
    select: {
      columnNames: columnNames,
    },
    filter: {
      connective: connective,
      expressions: expressions,
    },
  };

  if (pagination) {
    req.orderBy = { columnNames: columnNames };
    req.pagination = pagination;
  }

  return req;
}
