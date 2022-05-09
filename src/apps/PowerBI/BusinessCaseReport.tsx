import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';
import { useFusionContext } from '@equinor/portal-client';

export function BusinessCaseReport(): JSX.Element {
    const reportUri = 'pmt-non-confidential';
    const currentContext = useFusionContext();
    const filterOptions: Filter[] = [
        {
            values: [currentContext?.title || ''],
            target: {
                table: 'Dim_MasterProject',
                column: 'Project',
            },
            operator: 'In',
        },
        {
            values: [currentContext?.externalId || ''],
            target: {
                column: 'FACILITY',
                table: 'Commpkg',
            },
            operator: 'In',
        },
    ];
    if (!currentContext) {
        return <div> No context selected.</div>;
    }
    return <PowerBI reportUri={reportUri} filterOptions={filterOptions} />;
}
