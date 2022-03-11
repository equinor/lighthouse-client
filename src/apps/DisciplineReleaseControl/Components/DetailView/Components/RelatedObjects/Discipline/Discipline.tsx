import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { Discipline as DisciplineInterface } from '../../../../../Types/disciplineReleaseControl';
import { Wrapper } from '../WrapperStyles';
import { getDisciplineByCode } from '../../../../../Api/PCS/getDisciplineByCode';
import { QueryKeys } from '../../../../../Api/queryKeys';

interface DisciplineProps {
    discipline: DisciplineInterface;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    const { data } = useQuery(
        [QueryKeys.Discipline, discipline.procosysId, discipline.procosysCode],
        () => getDisciplineByCode(discipline.procosysCode),
        {
            staleTime: Infinity,
            cacheTime: Infinity,
        }
    );

    return (
        <Wrapper key={discipline.id}>
            <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />
            <Link>
                DISC_{discipline.procosysCode} - {data?.Description}
            </Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
