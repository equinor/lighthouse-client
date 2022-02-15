import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Discipline as DisciplineInterface } from '../../../../../Types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';

interface DisciplineProps {
    discipline: DisciplineInterface;
}

export const Discipline = ({ discipline }: DisciplineProps): JSX.Element => {
    return (
        <Wrapper key={discipline.id}>
            <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />
            <Link>DISC_{discipline.procosysCode}</Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
