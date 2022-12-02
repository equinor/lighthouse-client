import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { TabTable } from '@equinor/GardenUtils';
import { Column, CustomLinkCellWithTextDecoration, CellProps } from '@equinor/Table';
import { useQuery } from 'react-query';
import { proCoSysUrls } from '@equinor/procosys-urls';

import styled from 'styled-components';
import { Query, QueryCommpkg } from '../../../types';
import { getqueryCommpkg, queryCommpkgColumnNames } from '../../../utility/api';

const columns: Column<QueryCommpkg>[] = [
    {
        id: 'CommissioningPackageNo',
        Header: 'Commpkg no',
        accessor: (pkg) => ({
            content: pkg,
            currentKey: 'contentTagNo',
            url: proCoSysUrls.getCommPkgUrl(pkg.commissioningPackageId ?? ''),
        }),
        width: 150,

        Cell: (cellProps: CellProps<Query>) => (
            <CustomLinkCellWithTextDecoration
                contentToBeDisplayed={cellProps.value.content.commissioningPackageNo}
                url={cellProps.value.url}
            />
        ),
    },
];
type QueryCommpkgProps = {
    query: Query;
};
export const QueryCommpkgTable = ({ query }: QueryCommpkgProps): JSX.Element => {
    const expressions = generateExpressions('queryNo', 'Equals', [query.queryNo]);
    const requestArgs = generateFamRequest(queryCommpkgColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['queryCommpkg', query.queryNo], ({ signal }) =>
        getqueryCommpkg(requestArgs, signal)
    );

    return (
        <TabTable
            columns={columns}
            packages={data}
            error={error instanceof Error ? error : null}
            isFetching={isLoading}
            resourceName="Query commpkg"
            height={300}
        />
    );
};

const TabContent = styled.div`
    height: 100%;
    overflow: auto;
    box-sizing: border-box;
    h3 {
        padding: 8px;
    }
`;

type CommpkgTabProps = {
    query: Query;
};
export const CommpkgTab = ({ query }: CommpkgTabProps) => {
    return (
        <TabContent>
            <h3>Commpkgs</h3>
            <QueryCommpkgTable query={query} />
        </TabContent>
    );
};
