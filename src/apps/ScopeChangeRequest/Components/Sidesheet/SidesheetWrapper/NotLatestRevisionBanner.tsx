import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';

export const NotLatestRevisionWarningBanner = (): JSX.Element | null => {
    const { isLatest, latestId } = useScopeChangeContext(
        ({ request: { isLatestRevision, originator } }) => ({
            isLatest: isLatestRevision === null ? true : isLatestRevision,
            latestId: originator?.revisions[originator?.revisions.length - 1]?.id,
        })
    );

    if (isLatest) return null;
    const onClickLatest = () => openNewScopeChange(latestId);
    return (
        <WarningRevisionBannerWrapper>
            <InformationBanner>
                This is not the latest revision of this request.{' '}
                <Link onClick={onClickLatest}>Click here to see the latest.</Link>
            </InformationBanner>
        </WarningRevisionBannerWrapper>
    );
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
