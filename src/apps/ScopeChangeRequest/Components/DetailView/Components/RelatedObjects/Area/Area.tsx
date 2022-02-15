import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Area as AreaInterface } from '../../../../../Types/scopeChangeRequest';
import { Wrapper } from '../WrapperStyles';

interface AreaProps {
    area: AreaInterface;
}

export const Area = ({ area }: AreaProps): JSX.Element => {
    return (
        <Wrapper key={area.id}>
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="pin_drop" />

            <Link>LOC_{area.procosysCode}</Link>
        </Wrapper>
    );
};

const Link = styled.div`
    font-size: 16px;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
