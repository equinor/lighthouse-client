import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

export const WarningRevisionBanner = (): JSX.Element => {
    return (
        <WarningRevisionBannerWrapper>
            <InformationBanner>
                Creating the new revision will void the current revision of this request
            </InformationBanner>
        </WarningRevisionBannerWrapper>
    );
};

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
