import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../../hooks/context/useScopeChangeContext';
import { scopeChangeQueries } from '../../../../keys/queries';
type ContainerProps = {
    isRevision: boolean;
};
const Container = styled.div<ContainerProps>`
    width: -webkit-fill-available;
    border-radius: 5px;
    display: flex;
    min-width: 250px;
    min-height: 15px;
    height: auto;
    background-color: ${(props) =>
        props.isRevision
            ? tokens.colors.ui.background__info.hex
            : tokens.colors.ui.background__danger.hex};
    padding: 1em;
    gap: 0.3em;
`;
const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const RevisionBanner = () => {
    const { request } = useScopeChangeContext();
    const { data: revisions } = useQuery(scopeChangeQueries.revisionsQuery(request.id));

    const lastRevision = useMemo(() => revisions?.[0], [revisions]);
    return (
        <Container isRevision>
            <div>
                Revision {request.revisionNumber}. This request has been revisioned{' '}
                {new Date(request.modifiedAtUtc).toLocaleDateString()}
                {request.modifiedBy &&
                    ` by ${request.modifiedBy.firstName} ${request.modifiedBy.lastName}. Reason: `}
                {request.newRevisionOrVoidReason}. {'  '}
            </div>

            {lastRevision && lastRevision?.id && (
                <Link onClick={() => openNewScopeChange(lastRevision.id)}>
                    Click here to see the latest revision.
                </Link>
            )}
        </Container>
    );
};

export const VoidedOrRevisionBanner = (): JSX.Element | null => {
    const { request } = useScopeChangeContext();
    const { data: revisions, isLoading } = useQuery(scopeChangeQueries.revisionsQuery(request.id));
    if (!request.isVoided || isLoading) return null;

    if (revisions?.length !== request.revisionNumber) {
        return <RevisionBanner />;
    }
    return (
        <Container isRevision={false}>
            This request has been voided {new Date(request.modifiedAtUtc).toLocaleDateString()}{' '}
            {request.modifiedBy &&
                ` by ${request.modifiedBy.firstName} ${request.modifiedBy.lastName}. Reason: `}
            {request.newRevisionOrVoidReason}
        </Container>
    );
};
