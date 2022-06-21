//TODO Extract to package
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
export type Connective = 'And' | 'Or';
export type Operator =
    | 'Equals'
    | 'Like'
    | 'NotEquals'
    | 'GreaterThan'
    | 'LessThan'
    | 'GreaterThanOrEquals'
    | 'LessThanOrEquals'
    | 'StartsWith'
    | 'EndsWith'
    | 'NotLike'
    | 'DoesNotStartWith'
    | 'DoesNotEndWith'
    | 'IsNull'
    | 'IsNotNull ';

export interface Select {
    columnNames: string[];
}

export interface Expression {
    type: 'Leaf';
    columnName: string;
    operator: Operator;
    value: string;
}

export interface Filter {
    expressions: Expression[];
    connective: Connective;
}

export interface FamRequest {
    select: Select;
    filter: Filter;
    orderBy?: Select;
    pagination?: Pagination;
}

export interface Pagination {
    skip: number;
    take: number;
}
