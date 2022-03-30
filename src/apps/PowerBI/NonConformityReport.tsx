import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';

export function NonConformityReport() {
    const reportUri = '43116078-6fc0-47c4-8f3b-880faacf5ea0';

    const filterOptions: Filter[] = [
        {
            values: ['Johan Castberg'],
            target: {
                table: 'Dim_MasterProject',
                column: 'Project',
            },
            operator: 'In',
        },
    ];

    return <PowerBI reportUri={reportUri} filterOptions={filterOptions} />;
}
