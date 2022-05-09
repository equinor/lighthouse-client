import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';
import { useFusionContext } from '@equinor/portal-client';
import { useMemo } from 'react';

export const SafetyPerformanceReport = (): JSX.Element => {
    const reportUri = 'ssu-sp';
    const currentContext = useFusionContext();
    const filterOptions = useMemo(
        (): Filter[] => [
            {
                target: {
                    table: 'Dim_MasterProject',
                    column: 'Project',
                },
                operator: 'In',
                values: [currentContext?.title || 'No context. Show empty report'],
            },
        ],
        [currentContext?.id]
    );

    if (!currentContext) {
        return <div> No context selected.</div>;
    }
    return <PowerBI reportUri={reportUri} filterOptions={filterOptions} />;
};
