import styled from 'styled-components';
import { ReleaseControlArea, ReleaseControlTag } from '../../types/releaseControl';
import { ChevronList } from '../ChevronList/ChevronList';
import { Tag as TagComp } from './Tag';
import { Area as AreaComp } from './Area';

interface RelatedObjectsProps {
    tags: ReleaseControlTag[];
    areas: ReleaseControlArea[];
}

export const ReferencesList = ({ tags = [], areas = [] }: RelatedObjectsProps): JSX.Element => {
    return (
        <Wrapper>
            {tags.length === 0 && areas.length === 0 && (
                <NoReferences>No references has been linked.</NoReferences>
            )}
            {tags && tags.length > 0 && (
                <ChevronList title={`Tags (${tags?.length})`}>
                    <>
                        {tags.map((x) => (
                            <TagComp key={x.id} tag={x} />
                        ))}
                    </>
                </ChevronList>
            )}

            {areas && areas.length > 0 && (
                <ChevronList title={`Areas (${areas.length})`}>
                    <>
                        {areas.map((x) => (
                            <AreaComp key={x.id} area={x} />
                        ))}
                    </>
                </ChevronList>
            )}
        </Wrapper>
    );
};

const NoReferences = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1em;
`;
