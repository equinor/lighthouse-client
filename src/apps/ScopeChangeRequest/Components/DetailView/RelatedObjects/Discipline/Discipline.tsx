import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ScopeChangeDiscipline } from '../../../../types/scopeChangeRequest';
import { useEffect, useState } from 'react';
import { Discipline as PCSDiscipline } from '../../../../types/ProCoSys/discipline';
import { useFacility } from '../../../../../../Core/Client/Hooks';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Link, Wrapper, TextWrapper } from '../WrapperStyles';

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
            <TextWrapper>
                <Link>
                    {discipline.procosysCode} - {foundDiscipline?.Description}
                </Link>
            </TextWrapper>
        </Wrapper>
    );
};
