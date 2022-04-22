import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ScopeChangeTag } from '../../../../types/scopeChangeRequest';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Wrapper } from '../WrapperStyles';
import { ProCoSysQueries } from '../../../../keys/ProCoSysQueries';
import { useQuery } from 'react-query';
import { Tag as TagInterface } from '../../../../types/ProCoSys/Tag';

interface TagProps {
    tag: ScopeChangeTag;
}

export const Tag = ({ tag }: TagProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
    const { getTagByNoQuery } = ProCoSysQueries;

    const { data } = useQuery<unknown, unknown, TagInterface>({
        ...getTagByNoQuery(tag.procosysId, procosysPlantId),
    });

    return (
        <Wrapper key={tag.id}>
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="tag" />
            <TagText>
                <Link
                    href={`https://${isProduction() ? 'procosys' : 'procosystest'
                        }.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tag.procosysId}`}
                    target="_blank"
                >
                    {tag.procosysNumber}
                </Link>
                - <div>{data?.Description}</div>
            </TagText>
        </Wrapper>
    );
};

const TagText = styled.div`
    display: flex;
    flex-direction: row;
    gap: 0.2em;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;
