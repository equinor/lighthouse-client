import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Tag as TagInterface } from '../../../../Types/disciplineReleaseControl';
import { isProduction } from '../../../../../../Core/Client/';

interface TagProps {
    tag: TagInterface;
}

export const Tag = ({ tag }: TagProps): JSX.Element => {
    return (
        <TagWrapper key={tag.id}>
            <IconWrapper>
                <Icon color={tokens.colors.interactive.primary__resting.hex} name="tag" />
            </IconWrapper>
            <Link
                href={`https://${
                    isProduction() ? 'procosys' : 'procosystest'
                }.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tag.procosysId}`}
                target="_blank"
            >
                TAG_{tag.procosysNumber}
            </Link>
        </TagWrapper>
    );
};

const IconWrapper = styled.div`
    margin: 0rem 0.2rem;
`;

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
    color: ${tokens.colors.interactive.primary__resting.hex};
    margin: 0.2rem 0rem;
`;
