import { tokens } from '@equinor/eds-tokens';
import { useMemo } from 'react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { scopeChangeQueries } from '../../../keys/queries';

export const NotLatestRevisionWarningBanner = (): JSX.Element | null => {
    const id = useScopeChangeContext((s) => s.request.id);
    const { data: revisions } = useQuery(scopeChangeQueries.revisionsQuery(id));

    const lastRevision = useMemo(() => revisions?.[0], [revisions]);
    if (!revisions || !lastRevision) return null;

    if (lastRevision?.id !== id) {
        return (
            <WarningRevisionBannerWrapper>
                <InformationBanner>
                    This is not the latest revision of this request.{' '}
                    {lastRevision && lastRevision.id && (
                        <Link onClick={() => openNewScopeChange(lastRevision?.id)}>
                            Click here to see the latest.
                        </Link>
                    )}
                </InformationBanner>
            </WarningRevisionBannerWrapper>
        );
    }
    return null;
};

const Link = styled.div`
    color: ${tokens.colors.interactive.primary__resting.hex};
    cursor: pointer;
    &:hover {
        text-decoration: underline;
    }
`;

const WarningRevisionBannerWrapper = styled.div`
    padding: 20px;
`;

const InformationBanner = styled.div`
    background-color: ${tokens.colors.ui.background__info.hex};
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 5px;
    height: 36px;
    width: 100%;
`;
