import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Tag } from '../../../Types/scopeChangeRequest';

interface TagsProps {
    tags: Tag[];
}

export const ProcosysTags = ({ tags }: TagsProps): JSX.Element => {
    return (
        <Wrapper>
            {tags &&
                tags.map((x) => (
                    <TagWrapper key={x.id}>
                        <Icon color={tokens.colors.interactive.primary__resting.hex} name="tag" />
                        <Spacer />
                        <Link
                            href={`https://procosys.equinor.com/JOHAN_CASTBERG/Completion#Tag|${x.procosysId}`}
                            target="_blank"
                        >
                            TAG_{x.procosysNumber}
                        </Link>
                    </TagWrapper>
                ))}
        </Wrapper>
    );
};

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const TagWrapper = styled.div`
    display: flex;
    font-size: 16px;
    height: 16px;
    justify-content: space-between;
    align-items: center;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const Spacer = styled.div`
    width: 5px;
`;
