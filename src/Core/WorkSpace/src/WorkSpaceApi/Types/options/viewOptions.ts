export type ViewOptions<T extends Record<PropertyKey, unknown>> = {
    objectIdentifierKey: keyof T;
    title?: {
        key: keyof T;
        label: string;
    };
    description?: {
        key: keyof T;
        label: string;
    };
};
