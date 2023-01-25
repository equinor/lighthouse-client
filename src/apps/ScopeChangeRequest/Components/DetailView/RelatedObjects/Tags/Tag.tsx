import { ScopeChangeTag } from '../../../../types/scopeChangeRequest';
import { useFacility } from '../../../../../../Core/Client';
import { Link, Wrapper, TextWrapper, MainText, MetaData } from '../WrapperStyles';
import { useQuery } from 'react-query';
import { proCoSysQueries, Tag as TagInterface } from '@equinor/Workflow';
import { proCoSysUrls } from '@equinor/procosys-urls';

interface TagProps {
    tag: ScopeChangeTag;
}

export const Tag = ({ tag }: TagProps): JSX.Element => {
    const { procosysPlantId } = useFacility();
    const { getTagByNoQuery } = proCoSysQueries;

    const { data } = useQuery<unknown, unknown, TagInterface>(
        getTagByNoQuery(tag.procosysId, procosysPlantId)
    );

    return (
        <Wrapper
            onClick={() => window.open(proCoSysUrls.getTagUrl(tag.procosysId), '_blank')}
            key={tag.id}
        >
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
