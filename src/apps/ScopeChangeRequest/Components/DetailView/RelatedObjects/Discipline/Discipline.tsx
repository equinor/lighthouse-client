import { ScopeChangeDiscipline } from '../../../../types/scopeChangeRequest';
import { useEffect, useState } from 'react';
import { Discipline as PCSDiscipline } from '../../../../types/ProCoSys/discipline';
import { useFacility } from '../../../../../../Core/Client/Hooks';
import { proCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Link, Wrapper, TextWrapper } from '../WrapperStyles';

interface DisciplineProps {
    discipline: ScopeChangeDiscipline;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    const { procosysPlantId } = useFacility();

    const { getDisciplinesQuery } = proCoSysQueries;

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
            <TextWrapper>
                <Link>
                    {discipline.procosysCode} - {foundDiscipline?.Description}
                </Link>
            </TextWrapper>
        </Wrapper>
    );
};
