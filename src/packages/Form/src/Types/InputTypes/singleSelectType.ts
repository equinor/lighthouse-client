export interface SingleSelect {
    type: 'SingleSelect';
    selectOptions: string[] | (() => Promise<string[]>);
    CustomInputType?: React.FC<{ options: string[] }>;
}
