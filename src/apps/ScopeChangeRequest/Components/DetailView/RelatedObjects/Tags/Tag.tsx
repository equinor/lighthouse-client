import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ScopeChangeTag } from '../../../../types/scopeChangeRequest';
import { isProduction, useFacility } from '../../../../../../Core/Client';
import { Link, Wrapper, TextWrapper, MainText, MetaData } from '../WrapperStyles';
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
        <Wrapper
            onClick={() =>
                window.open(
                    `https://${isProduction() ? 'procosys' : 'procosystest'
                    }.equinor.com/JOHAN_CASTBERG/Completion#Tag|${tag.procosysId}`,
                    '_blank'
                )
            }
            key={tag.id}
        >
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="tag" />
            <TextWrapper>
                <MainText>
                    <Link>{tag.procosysNumber}</Link>- <div>{data?.Description}</div>
                </MainText>
                <MetaData>
                    Comm pkg: {data?.CommPkgNo ?? 'none'} | Tag register {data?.RegisterCode}
                </MetaData>
            </TextWrapper>
        </Wrapper>
    );
};
