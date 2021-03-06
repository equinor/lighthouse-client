import styled from 'styled-components';
import { ChevronList } from '../ChevronList/ChevronList';
import { ReleaseControlDocument, ReleaseControlPunch } from '../../types/releaseControl';
import { Document } from './Document';
import { Punch } from './Punch';

interface RelatedObjectsProps {
    documents: ReleaseControlDocument[];
    punchListItems: ReleaseControlPunch[];
}

export const ReferencesList = ({
    documents = [],
    punchListItems = [],
}: RelatedObjectsProps): JSX.Element => {
    return (
        <Wrapper>
            {documents.length === 0 && punchListItems.length === 0 && (
                <NoReferences>No references has been linked.</NoReferences>
            )}
            {documents && documents.length > 0 && (
                <ChevronList title={`Documents (${documents?.length})`}>
                    <>
                        {documents &&
                            documents.length > 0 &&
                            documents.map((x) => (
                                <Document key={x.stidDocumentNumber} docNo={x.stidDocumentNumber} />
                            ))}
                    </>
                </ChevronList>
            )}

            {punchListItems && punchListItems.length > 0 && (
                <ChevronList title={`Punch list items (${punchListItems.length})`}>
                    <>
                        {punchListItems.map((x) => (
                            <Punch key={x.id} punchListItem={x} />
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
