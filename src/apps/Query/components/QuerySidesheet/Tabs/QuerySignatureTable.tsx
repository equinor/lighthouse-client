import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { TabTable } from '@equinor/GardenUtils';
import { sortBySequence } from '../../../helpers/sortFuctions';
import { Column } from '@equinor/Table';
import { useQuery } from 'react-query';
import {
    Query,
    QuerySignature,
    getQuerySignatures,
    querySignaturesColumnNames,
} from '../../../model';

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
        id: 'functionalRole',
        Header: 'By',
        accessor: (pkg) => pkg.functionalRole,
        width: 150,
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
type LoopContentProps = {
    query: Query;
};
export const QuerySignatureTable = ({ query }: LoopContentProps) => {
    const expressions = generateExpressions('queryNo', 'Equals', [query.queryNo || '']);
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
