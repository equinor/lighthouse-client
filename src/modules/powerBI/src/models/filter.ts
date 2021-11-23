type BasicFilterOperators = "In" | "NotIn" | "All";

export interface PowerBiFilter {

    $schema: string;
    target: {
        table: string;
        column: string;
    };
    filterType: number;
    operator: BasicFilterOperators;
    values: string[];
}

export interface Filter {
    values: string[],
    target: {
        table: string,
        column: string,
    }
    operator: BasicFilterOperators
}