import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useConditionalRender } from '../../../../Hooks/useConditionalRender';

interface CommPkgProps {
    children: React.ReactChild;
    title: string;
}

export const ChevronList = ({ children, title }: CommPkgProps): JSX.Element => {
    const { Component: List, toggle, isShowing } = useConditionalRender(<>{children}</>);

    return (
        <Wrapper>
            <ListWrapper onClick={() => toggle()}>
                <IconWrapper>
                    <Icon name={`chevron_${isShowing ? 'up' : 'down'}`} />
                </IconWrapper>
                <div style={{ fontSize: '14px', lineHeight: "20px" }}>{title}</div>
            </ListWrapper>
            <List />
        </Wrapper>
    );
};

const IconWrapper = styled.div`
    margin-right: 0.2rem;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const ListWrapper = styled.div`
    gap: 22px;
    display: flex;
    font-size: 16px;
    height: 16px;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
