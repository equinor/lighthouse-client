import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Area as AreaInterface } from '../../../../Types/disciplineReleaseControl';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    return (
        <AreaWrapper key={area.id}>
            <Link>LOC_{area.procosysCode}</Link>
        </AreaWrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const AreaWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
