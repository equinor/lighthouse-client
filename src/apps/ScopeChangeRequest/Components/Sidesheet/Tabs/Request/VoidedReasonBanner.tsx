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
            Revision {request.revisionNumber}. Reason from the person is:{' '}
            {request.newRevisionOrVoidReason}.{' '}
            {lastRevision && lastRevision?.id && (
                <Link onClick={() => openNewScopeChange(lastRevision.id)}>
                    Click here to see the latest.
                </Link>
            )}
        </Container>
    );
};

export const VoidedOrRevisionBanner = (): JSX.Element | null => {
    const { request } = useScopeChangeContext();
    if (!request.isVoided) return null;

    if (request.revisionNumber > 1) {
        return <RevisionBanner />;
    }
    return (
        <Container isRevision={false}>
            This request has been voided. Reason from the person is:{' '}
            {request.newRevisionOrVoidReason}
        </Container>
    );
};
