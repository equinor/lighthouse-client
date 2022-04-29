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
            <TextWrapper>
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
                <MetaData>
                    Comm pkg: {data?.CommPkgNo ?? 'none'} Tag register {data?.RegisterCode}
                </MetaData>
            </TextWrapper>
        </Wrapper>
    );
};

const MetaData = styled.div`
    font-size: 12px;
    color: ${tokens.colors.text.static_icons__default.hex};
`;

const TextWrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

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
`;
