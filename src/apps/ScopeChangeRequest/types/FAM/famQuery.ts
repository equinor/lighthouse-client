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
