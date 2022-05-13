import { useFusionContext } from '@equinor/lighthouse-portal-client';
import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';
import { useMemo } from 'react';

export const SafetyPerformanceReport = (): JSX.Element => {
    const reportUri = 'ssusp';
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
