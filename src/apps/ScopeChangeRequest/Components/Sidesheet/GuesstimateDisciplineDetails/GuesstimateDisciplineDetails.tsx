import { useCallback } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useFacility } from '../../../../../Core/Client/Hooks';
import { ProCoSysQueries } from '../../../keys/ProCoSysQueries';
import { Discipline } from '../../../types/ProCoSys/discipline';
import { ScopeChangeDisciplineGuesstimates } from '../../../types/scopeChangeRequest';

export function GuesstimateDisciplineDetails({
    discipline,
    guesstimate,
}: ScopeChangeDisciplineGuesstimates): JSX.Element {
    const { getDisciplinesQuery } = ProCoSysQueries;
    const { procosysPlantId } = useFacility();
    const { data: disciplines } = useQuery<unknown, unknown, Discipline[]>(
        getDisciplinesQuery(procosysPlantId)
    );

    const getDisciplineDescription = useCallback(
        (code: string) => disciplines?.find(({ Code }) => code === Code)?.Description,
        [disciplines]
    );

    return (
        <GuesstimateRow>
            <div>{`${discipline.procosysCode} - ${getDisciplineDescription(
                discipline.procosysCode
            )}`}</div>
            <div>{guesstimate}</div>
        </GuesstimateRow>
    );
}
const GuesstimateRow = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    font-size: 16px;
    font-weight: 400;
    line-height: 24px;
    letter-spacing: 0.4px;
    text-align: left;
`;
