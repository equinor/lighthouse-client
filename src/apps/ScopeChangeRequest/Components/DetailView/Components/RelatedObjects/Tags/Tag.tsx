import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { Tag as TagInterface } from '../../../../../Types/scopeChangeRequest';
import { isProduction } from '../../../../../../../Core/Client/';
import { Wrapper } from '../WrapperStyles';
import { getTagById } from '../../../../../Api/PCS/getTagById';
import { useInfiniteCachedQuery } from '../../../../../Hooks/React-Query/useInfiniteCachedQuery';
import { useScopeChangeContext } from '../../../../Sidesheet/Context/useScopeChangeAccessContext';
import { useScopechangeQueryKeyGen } from '../../../../../Hooks/React-Query/useScopechangeQueryKeyGen';

interface TagProps {
    tag: TagInterface;
}

export const Tag = ({ tag }: TagProps): JSX.Element => {
    const { request } = useScopeChangeContext();
    const { referencesKeys } = useScopechangeQueryKeyGen(request.id);

    const { data } = useInfiniteCachedQuery(referencesKeys.tag(tag.procosysNumber), () =>
        getTagById(tag.procosysId)
    );

    return (
        <Wrapper key={tag.id}>
            <Icon color={tokens.colors.interactive.primary__resting.hex} name="tag" />
            <TagText>
                <Link
                    href={`https://${
                        isProduction() ? 'procosys' : 'procosystest'
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
`;

const Link = styled.a`
    font-size: 16px;
    text-decoration: underline;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;
