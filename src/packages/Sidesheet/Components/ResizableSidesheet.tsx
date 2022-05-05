import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { IconMenu, MenuItem } from '@equinor/overlay-menu';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import styled from 'styled-components';
import { getApps } from '../../../apps/apps';

import ErrorFallbackSidesheet from '../../../Core/ErrorBoundary/Components/ErrorFallbackSidesheet';
import { useSideSheet } from '../context/sidesheetContext';
import {
    ToggleFunction,
    useInternalSidesheetFunction,
} from '../Hooks/useInternalSidesheetFunction';

const DEFAULT_TAB_COLOUR = '#ff9900';

export interface SidesheetApi {
    closeSidesheet: () => void;
    setIsMinimized: (isMinimized: boolean | ToggleFunction) => void;
    setWidth: (width: number) => void;
    setTitle: React.Dispatch<React.SetStateAction<JSX.Element | null | undefined>>;
    setMenuItems: (menuItems: MenuItem[]) => void;
}

export const ResizableSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent, props, minWidth, width, isMinimized, appName } = useSideSheet();
    const { closeSidesheet, setIsMinimized, setWidth } = useInternalSidesheetFunction();
    const appColor = getApps().find(({ shortName }) => shortName === appName)?.color;

    const handleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    // Header stuff
    const [title, setTitle] = useState<JSX.Element | null>();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const actions = {
        closeSidesheet: closeSidesheet,
        setIsMinimized: setIsMinimized,
        setWidth: setWidth,
        setTitle: setTitle,
        setMenuItems: setMenuItems,
    };

    const sidesheetProps = { item: props, actions: actions };

    if (!SidesheetComponent) return null;

    if (isMinimized) {
        return (
            //HACK: auto doesnt work?
            <div style={{ width: '24px' }}>
                <ColourTab appColor={appColor ?? DEFAULT_TAB_COLOUR} onClick={handleMinimize}>
                    <Icon name="chevron_left" color={'white'} />
                </ColourTab>
                <RotatedText>{title}</RotatedText>
                <div style={{ display: 'none' }}>
                    <SidesheetComponent {...sidesheetProps} />
                </div>
            </div>
        );
    }

    return (
        <div style={{ height: '100%' }}>
            <Resizable
                size={{ width: width, height: '100%' }}
                maxWidth={'100vw'}
                onResizeStop={(e, direction, ref, d) => {
                    if (width + d.width < minWidth) {
                        //setWidth(defaultWidth);
                        setIsMinimized(true);
                    } else {
                        setWidth(width + d.width);
                    }
                }}
            >
                <Header>
                    <LeftHeader>
                        <ColourTab
                            appColor={appColor ?? DEFAULT_TAB_COLOUR}
                            onClick={handleMinimize}
                        >
                            <Icon name="chevron_right" size={24} color={'white'} />
                        </ColourTab>
                        <Title>{title}</Title>
                    </LeftHeader>

                    <RightHeader>
                        {menuItems.length > 0 && <IconMenu placement="bottom" items={menuItems} />}
                        <Button variant="ghost_icon" onClick={closeSidesheet}>
                            <Icon
                                name="close"
                                size={24}
                                color={tokens.colors.interactive.primary__resting.hex}
                            />
                        </Button>
                    </RightHeader>
                </Header>

                <ErrorBoundary FallbackComponent={ErrorFallbackSidesheet} routeName={'Sidesheet'}>
                    <div style={{ height: '95%' }}>
                        <SidesheetComponent {...sidesheetProps} />
                    </div>
                </ErrorBoundary>
            </Resizable>
        </div>
    );
};

const LeftHeader = styled.div`
    display: flex;
    gap: 0.5em;
    flex-direction: row;
    align-items: center;
    width: 80%;
`;

const RightHeader = styled.div`
    display: flex;
    flex-direction: row;
    width: fit-content;
`;

const Title = styled.div`
    font-size: 24px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
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
