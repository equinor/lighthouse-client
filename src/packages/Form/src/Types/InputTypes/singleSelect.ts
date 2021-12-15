export interface SingleSelect {
    type: 'SingleSelect';
    selectOptions: string[];
    CustomInputType?: React.FC<{ options: string[] }>;
}
