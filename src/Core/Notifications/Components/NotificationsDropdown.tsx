import { useState } from 'react';
import { Icon } from '@equinor/eds-core-react';
import styled from 'styled-components';

export function NotificationsDropwdown() {
    const [isExpanded, setIsExpanded] = useState<boolean>(false);

    return (
        <>
            <Icon name="notifications" onClick={() => setIsExpanded(isExpanded)} />
            {isExpanded && <NotificationsDrawer></NotificationsDrawer>}
        </>
    );
}

const NotificationsDrawer = styled.div`
    display: flex;
`;
