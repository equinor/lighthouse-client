export interface MultiSelect {
    type: 'MultiSelect';
    selectOptions: string[];
    CustomInputType?: React.FC<{ options: string[] }>;
}
