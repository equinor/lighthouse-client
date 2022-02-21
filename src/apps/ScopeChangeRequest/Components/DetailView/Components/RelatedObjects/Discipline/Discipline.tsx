import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Discipline as DisciplineInterface } from '../../../../../Types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';
import { useInfiniteCachedQuery } from '../../../../../Hooks/React-Query/useInfiniteCachedQuery';
import { useScopeChangeContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useScopechangeQueryKeyGen } from '../../../../../Hooks/React-Query/useScopechangeQueryKeyGen';
import { useEffect, useState } from 'react';
import { Discipline as PCSDiscipline } from '../../../../../Types/ProCoSys/discipline';
import { getDisciplines } from '../../../../../Api/PCS/getDisciplines';

interface DisciplineProps {
    discipline: DisciplineInterface;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    const { request } = useScopeChangeContext();
    const { referencesKeys } = useScopechangeQueryKeyGen(request.id);

    const { data } = useInfiniteCachedQuery(referencesKeys.disciplines, getDisciplines);

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
                DISC_{discipline.procosysCode} - {foundDiscipline?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
`;
