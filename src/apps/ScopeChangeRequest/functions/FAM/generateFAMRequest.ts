import { Connective, Expression, FamRequest, Operator } from '../../types/FAM/famQuery';

export function generateFamRequest(
    columnNames: string[],
    connective: Connective,
    expressions: Expression[]
): FamRequest {
    return {
        select: {
            columnNames: columnNames,
        },
        filter: {
            connective: connective,
            expressions: expressions,
        },
    };
}

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
