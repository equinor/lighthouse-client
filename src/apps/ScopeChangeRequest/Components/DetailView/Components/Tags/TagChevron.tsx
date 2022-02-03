import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { useConditionalRender } from '../../../../Hooks/useConditionalRender';
import { Tag as TagInterface } from '../../../../Types/scopeChangeRequest';
import { Tag } from './Tag';

interface TagsProps {
    tags: TagInterface[];
}

export const ProcosysTags = ({ tags }: TagsProps): JSX.Element => {
    const {
        Component: TagsList,
        toggle,
        isShowing,
    } = useConditionalRender(<>{tags && tags.map((x) => <Tag key={x.procosysId} tag={x} />)}</>);

    return (
        <Wrapper>
            <TagWrapper onClick={() => toggle()}>
                <IconWrapper>
                    <Icon name={`chevron_${isShowing ? 'up' : 'down'}`} />
                </IconWrapper>
                <div style={{ fontSize: '14px' }}>Tags ({tags.length})</div>
            </TagWrapper>
            <TagsList />
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

const TagWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
