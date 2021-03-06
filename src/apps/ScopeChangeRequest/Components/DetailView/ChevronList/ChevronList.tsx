import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ClickableIcon } from '../../../../../components/Icon/ClickableIcon';
import { useConditionalRender } from '../../../hooks/utils/useConditionalRender';

interface CommPkgProps {
    children: React.ReactChild;
    title: string;
}

export const ChevronList = ({ children, title }: CommPkgProps): JSX.Element => {
    const { Component: List, toggle, isShowing } = useConditionalRender(<>{children}</>);

    return (
        <Wrapper>
            <ListWrapper style={{ cursor: 'pointer' }} onClick={() => toggle()}>
                <ClickableIcon name={`chevron_${isShowing ? 'up' : 'down'}`} />
                <div style={{ fontSize: '14px', lineHeight: '20px' }}>{title}</div>
            </ListWrapper>
            <List />
        </Wrapper>
    );
};

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5em;
`;

const ListWrapper = styled.div`
    gap: 1em;
    display: flex;
    font-size: 16px;
    height: 16px;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
