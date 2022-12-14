import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { TabTable } from '@equinor/GardenUtils';
import { useGetUser } from '@equinor/hooks';
import { CellProps, Column } from '@equinor/Table';
import { useQuery } from 'react-query';
import { Query, QuerySignature } from '../../../types';
import { getQuerySignatures, querySignaturesColumnNames } from '../../../utility/api';
import { sortBySequence } from '../../../utility/helpers';
const columns: Column<QuerySignature>[] = [
    {
        id: 'SignatureRole',
        Header: 'Signature role',
        accessor: (pkg) => pkg.signatureRole,
        width: 150,
    },
    {
        id: 'Sequence',
        Header: 'Sequence',
        accessor: (pkg) => pkg.sequence,
        width: 100,
        sortType: 'number',
    },
    {
        Header: 'By',
        accessor: (pkg) => pkg.signedByAzureOid,
        Cell: (cellProps: CellProps<QuerySignature, string | null>) => {
            const { error, isLoadingUser, user } = useGetUser(cellProps.value ?? undefined);

            if (isLoadingUser) {
                return <div>....</div>;
            }
            if (error || !user) {
                return <div>{cellProps.row.original.functionalRole}</div>;
            }
            return <div>{user.name}</div>;
        },
        width: 280,
    },
    {
        id: 'signedDate',
        Header: 'Signed date',
        accessor: (pkg) => pkg.signedDate,
        Aggregated: () => null,
        aggregate: 'count',
        width: 100,
        Cell: (cellProps) => {
            return cellProps.value ? new Date(cellProps.value).toLocaleDateString() : '';
        },
    },
];
type QuerySignatureTableProps = {
    query: Query;
};
export const QuerySignatureTable = ({ query }: QuerySignatureTableProps): JSX.Element => {
    const expressions = generateExpressions('queryNo', 'Equals', [query.queryNo]);
    const requestArgs = generateFamRequest(querySignaturesColumnNames, 'Or', expressions);
    const { data, isLoading, error } = useQuery(['querySignature', query.queryNo], ({ signal }) =>
        getQuerySignatures(requestArgs, signal)
    );

    return (
        <TabTable
            columns={columns}
            packages={data ? data.sort(sortBySequence) : data}
            error={error instanceof Error ? error : null}
            isFetching={isLoading}
            resourceName="Query signature"
            height={300}
        />
    );
};
