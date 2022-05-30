type BasicFilterOperators = 'In' | 'NotIn' | 'All';

export interface BuiltPowerBiFilter {
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
    values: string[];
    target: {
        table: string;
        column: string;
    };
    operator: BasicFilterOperators;
}

export type ActiveFilter = string | number | boolean | null;
