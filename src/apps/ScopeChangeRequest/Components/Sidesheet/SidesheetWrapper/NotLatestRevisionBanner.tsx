import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { openNewScopeChange } from '../../../functions/openNewScopeChange';
import { useScopeChangeContext } from '../../../hooks/context/useScopeChangeContext';
import { Revision, ScopeChangeRequest } from '../../../types/scopeChangeRequest';

export const NotLatestRevisionWarningBanner = (): JSX.Element | null => {
    const request = useScopeChangeContext((s) => s.request);

    if (checkIfIsLatestRevision(request)) return null;
    const onClickLatest = () => openNewScopeChange(getLatestRevision(request).id);
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

function checkIfIsLatestRevision(req: ScopeChangeRequest) {
    return req.isLatestRevision;
}

function getLatestRevision(req: ScopeChangeRequest): Revision {
    if (req.isLatestRevision === null) {
        //Is an original
        return req.revisions[req.revisions.length - 1];
    } else {
        return req.originator.revisions[req.originator.revisions.length - 1];
    }
}
