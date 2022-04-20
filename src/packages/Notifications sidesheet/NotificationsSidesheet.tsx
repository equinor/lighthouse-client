import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import styled from 'styled-components';
import { ActionCenterSidesheet } from '../../components/ActionCenter/ActionCenterSidesheet';
import ErrorFallbackSidesheet from '../../Core/ErrorBoundary/Components/ErrorFallbackSidesheet';

const NotificationsColor = '#ff9900';

interface ResizableSidesheetProps {
    initialWidth?: number;
    closeSidesheet: () => void;
}
export interface SidesheetActions {
    setTitle: (title: string) => void;
    closeSidesheet: () => void;
}

export const NotificationsSidesheet = ({
    initialWidth,
    closeSidesheet,
}: ResizableSidesheetProps): JSX.Element | null => {
    // Header stuff
    const [title, setTitle] = useState<string>('');
    const [isMinimized, setIsMinimized] = useState(false);
    const [width, setWidth] = useState<number>(initialWidth ?? 650);

    const handleMinimize = () => setIsMinimized((prev) => !prev);

    if (isMinimized) {
        return (
            //HACK: auto doesnt work?
            <Wrapper style={{ width: '24px' }}>
                <ColourTab appColor={NotificationsColor} onClick={handleMinimize}>
                    <Icon name="chevron_left" color={'white'} />
                </ColourTab>
                <RotatedText>{title}</RotatedText>
            </Wrapper>
        );
    }

    return (
        <Wrapper>
            <Resizable
                size={{ width: width, height: '100%' }}
                onResizeStop={(e, direction, ref, d) => {
                    if (width + d.width < 100) {
                        setIsMinimized(true);
                    } else {
                        setWidth(width + d.width);
                    }
                }}
            >
                <Header>
                    <LeftHeader>
                        <ColourTab appColor={NotificationsColor} onClick={handleMinimize}>
                            <Icon name="chevron_right" size={24} color={'white'} />
                        </ColourTab>
                        <span>{title}</span>
                    </LeftHeader>

                    <span style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button variant="ghost_icon" onClick={closeSidesheet}>
                            <Icon
                                name="close"
                                size={24}
                                color={tokens.colors.interactive.primary__resting.hex}
                            />
                        </Button>
                    </span>
                </Header>

                <ErrorBoundary FallbackComponent={ErrorFallbackSidesheet} routeName={'Sidesheet'}>
                    <div style={{ height: '95%' }}>
                        <ActionCenterSidesheet actions={{ setTitle, closeSidesheet }} />
                    </div>
                </ErrorBoundary>
            </Resizable>
        </Wrapper>
    );
};

const LeftHeader = styled.div`
    display: flex;
    gap: 0.5em;
    flex-direction: row;
    align-items: center;
    font-size: 28px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    height: 76px;
    align-items: center;
`;

const ColourTab = styled.div<{ appColor: string }>`
    display: flex;
    align-items: center;
    background-color: ${({ appColor }) => appColor};
    height: 76px;
    width: 24px;
`;

const RotatedText = styled.span`
    display: inline-block;
    transform: rotate(90deg);
    transform-origin: left;
    margin-left: 10px;
    white-space: nowrap;
    font-size: 14px;
`;

const Wrapper = styled.div`
    height: 100vh;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 1000;
    background: white;
    border-left: 2px ${tokens.colors.ui.background__medium.hex} solid;
`;
