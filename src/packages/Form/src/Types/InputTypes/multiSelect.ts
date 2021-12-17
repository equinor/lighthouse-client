export interface MultiSelect {
    type: 'MultiSelect';
    selectOptions: string[] | (() => Promise<string[]>);
    CustomInputType?: React.FC<{ options: string[] }>;
}
