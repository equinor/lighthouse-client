import { generateExpressions, generateFamRequest } from '@equinor/fam-request-builder';
import { useQuery } from 'react-query';
import { getWorkorders, workorderColumnNames } from '../utility/api';

export const useGetWorkorders = (loopNo: string) => {
    const workorderExpressions = generateExpressions('loopNo', 'Equals', [loopNo || '']);
    const workorderRequestArgs = generateFamRequest(
        workorderColumnNames,
        'Or',
        workorderExpressions
    );
    const {
        data: workorders,
        isLoading: isLoadingWorkorders,
        error: workorderError,
    } = useQuery(['workorder', loopNo], ({ signal }) =>
        getWorkorders(workorderRequestArgs, signal)
    );

    return { workorders, isLoadingWorkorders, workorderError };
};
