import { Expression, Operator } from './types';

export function generateExpressions(
  columnName: string,
  operator: Operator,
  values: string[]
): Expression[] {
  return values.map((value) => ({
    columnName: columnName,
    operator: operator,
    type: 'Leaf',
    value: value,
  }));
}
