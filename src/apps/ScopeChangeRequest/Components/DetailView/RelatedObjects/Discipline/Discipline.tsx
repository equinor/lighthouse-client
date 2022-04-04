import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeDiscipline as DisciplineInterface } from '../../../../sTypes/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { useInfiniteCachedQuery } from '../../../../sHooks/react-Query/useInfiniteCachedQuery';
import { useEffect, useState } from 'react';
import { Discipline as PCSDiscipline } from '../../../../sTypes/ProCoSys/discipline';
import { getDisciplines } from '../../../../api/PCS/getDisciplines';
import { proCoSysQueryKeys } from '../../../../sKeys/proCoSysQueryKeys';
import { useFacility } from '../../../../../../Core/Client/Hooks';

interface DisciplineProps {
    discipline: DisciplineInterface;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    const { disciplines: disciplinesKey } = proCoSysQueryKeys();
    const { procosysPlantId } = useFacility();

    const { data } = useInfiniteCachedQuery(disciplinesKey, () => getDisciplines(procosysPlantId));

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
`;
