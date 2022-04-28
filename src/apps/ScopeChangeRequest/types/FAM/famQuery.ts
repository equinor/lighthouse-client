export type Connective = 'And' | 'Or';
export type Operator = 'Equals';

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
}
