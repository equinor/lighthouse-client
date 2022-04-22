import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeDiscipline } from '../../../../types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { useEffect, useState } from 'react';
import { Discipline as PCSDiscipline } from '../../../../types/ProCoSys/discipline';
import { useFacility } from '../../../../../../Core/Client/Hooks';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';

interface DisciplineProps {
    discipline: ScopeChangeDiscipline;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getDisciplinesQuery } = ProCoSysQueries;

    const { data } = useQuery<unknown, unknown, PCSDiscipline[]>(
        getDisciplinesQuery(procosysPlantId)
    );

    const [foundDiscipline, setFoundDiscipline] = useState<PCSDiscipline | null>();

    useEffect(() => {
        if (data) {
            const match = data.find((x) => x.Code === discipline.procosysCode);
            setFoundDiscipline(match);
        }
    }, [data, discipline.procosysCode]);

    return (
        <Wrapper key={discipline.id}>
            <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />
            <Link>
                {discipline.procosysCode} - {foundDiscipline?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
