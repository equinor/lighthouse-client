export interface ErrorMessageFormat {
    title: string | null;
    description?: string;
    queryKey: string[];
    type: 'Query' | 'Mutation';
}
