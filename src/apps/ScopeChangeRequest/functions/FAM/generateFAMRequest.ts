import { Connective, Expression, FamRequest, Operator, Pagination } from '../../types/FAM/famQuery';

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
