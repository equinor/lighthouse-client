import { useFusionContext } from '@equinor/lighthouse-portal-client';
import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';
import { useMemo } from 'react';

export function BusinessCaseReport(): JSX.Element {
    const reportUri = 'pmt-non-confidential';
    const currentContext = useFusionContext();
    const filterOptions: Filter[] = useMemo(
        () => [
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
        ],
        [currentContext?.id]
    );
    if (!currentContext) {
        return <div> No context selected.</div>;
    }
    return <PowerBI reportUri={reportUri} filterOptions={filterOptions} />;
}
