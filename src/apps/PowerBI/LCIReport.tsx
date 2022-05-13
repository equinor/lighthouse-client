import { useFusionContext } from '@equinor/lighthouse-portal-client';
import { Filter, PowerBI } from '@equinor/lighthouse-powerbi';
import { useMemo } from 'react';

const getContextTypeTarget = (contextType?: string) =>
    contextType === 'Facility'
        ? {
              table: 'FACT_CommPkg',
              column: 'FACILITY',
          }
        : {
              table: 'DIM_Project',
              column: 'Project name',
          };

export function LCIReport(): JSX.Element {
    const reportUri = 'lci-hanging-gardens';
    const currentContext = useFusionContext();
    const filterOptions: Filter[] = useMemo(
        () => [
            {
                values: [currentContext?.title || 'No context. Show empty report'],
                target: getContextTypeTarget(currentContext?.type.id),
                operator: 'In',
            },
        ],
        [currentContext?.type.id]
    );

    if (!currentContext) {
        return <div> No context selected.</div>;
    }

    return <PowerBI reportUri={reportUri} filterOptions={filterOptions} />;
}
