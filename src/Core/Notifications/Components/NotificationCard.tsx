import styled from 'styled-components';
import { AdaptiveCardViewer } from './AdaptiveCardViewer';

export function NotificationCard(payload): JSX.Element {
    return (
        <AdaptiveCardWrapper>
            <AdaptiveCardViewer payload={payload} />
        </AdaptiveCardWrapper>
    );
}

const AdaptiveCardWrapper = styled.div`
    display: flex;
    position: absolute;
    bottom: 0px;
    right: 0px;
    background-color: white;
    border: 2px solid black;
    z-index: 1000;
`;
