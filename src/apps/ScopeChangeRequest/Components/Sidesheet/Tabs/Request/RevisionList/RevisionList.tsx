import { tokens } from '@equinor/eds-tokens';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../../../hooks/context/useScopeChangeContext';
import { scopeChangeQueries } from '../../../../../keys/queries';
import {
    ScopeChangeRequest,
    ScopeChangeRequestState,
} from '../../../../../types/scopeChangeRequest';
import { MetaData } from '../../../../SearchReferences/searchReferences.styles';

export const RevisionsList = (): JSX.Element | null => {
    const id = useScopeChangeContext((s) => s.request.id);
    const { data } = useQuery(scopeChangeQueries.revisionsQuery(id));

    if (!data || data.length <= 1) {
        return <NoRevisionsText>No revisions has been made.</NoRevisionsText>;
    }

    return (
        <RevisionWrapper>
            {removeLastRevisionIfSelf(data, id).map(
                ({
                    id,
                    isVoided,
                    revisionNumber,
                    sequenceNumber,
                    state,
                    title,
                    workflowStatus,
                }) => (
                    <RevisionText key={id}>
                        <Link onClick={() => openNewScopeChange(id)}>
                            {sequenceNumber}
                            {revisionNumber && `-${revisionNumber}`}, {title}
                        </Link>
                        <MetaData>
                            {state}, {workflowStatus}, {isVoided ? 'Voided' : 'Not voided'}
                        </MetaData>
                    </RevisionText>
                )
            )}
        </RevisionWrapper>
    );
};

function removeLastRevisionIfSelf(data: ScopeChangeRequest[], id: string) {
    return data[0].id === id ? data.slice(1) : data;
}

const NoRevisionsText = styled.div`
    font-size: 14px;
    font-weight: 400;
`;

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    text-decoration: 'none';
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const RevisionText = styled.div`
    font-size: 16px;
    font-weight: 400;
    line-height: 20px;
    letter-spacing: 0em;
    text-align: left;
`;

const RevisionWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5em;
`;
