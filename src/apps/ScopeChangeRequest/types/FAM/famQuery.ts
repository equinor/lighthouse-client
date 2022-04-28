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
