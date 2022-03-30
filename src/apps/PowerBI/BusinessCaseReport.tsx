import { PowerBI } from '@equinor/lighthouse-powerbi';

export function BusinessCaseReport() {
    const reportUri = 'pmt-non-confidential';

    // const filterOptions: Filter[] = [
    //     {
    //         values: ['Johan Castberg'],
    //         target: {
    //             table: 'Dim_MasterProject',
    //             column: 'Project',
    //         },
    //         operator: 'In',
    //     },
    //     {
    //         values: ['JCA'],
    //         target: {
    //             column: 'FACILITY',
    //             table: 'Commpkg',
    //         },
    //         operator: 'In',
    //     },
    // ];

    return <PowerBI reportUri={reportUri} />;
}
