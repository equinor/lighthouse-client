import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Discipline as DisciplineInterface } from '../../../../Types/disciplineReleaseControl';

interface DisciplineProps {
    discipline: DisciplineInterface;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    return (
        <DisciplineWrapper key={discipline.id}>
            <Link>DISC_{discipline.procosysCode}</Link>
        </DisciplineWrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const DisciplineWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
