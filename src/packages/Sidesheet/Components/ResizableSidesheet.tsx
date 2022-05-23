import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ErrorBoundary, ErrorFallbackSidesheet } from '@equinor/ErrorBoundary';
import { IconMenu, MenuItem } from '@equinor/overlay-menu';
import { Resizable } from 're-resizable';
import { useState } from 'react';
import styled from 'styled-components';
import { openSidesheet } from '../Functions';
import { useInternalSidesheetFunction } from '../Hooks/useInternalSidesheetFunction';
import { useSideSheet } from '../Hooks/useSideSheet';
import { CustomSidesheet, SidesheetApi } from '../Types/SidesheetApi';

export const ResizableSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent, props, minWidth, width, isMinimized, color } = useSideSheet();
    const { closeSidesheet, setIsMinimized, setWidth } = useInternalSidesheetFunction();

    const handleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    // Header stuff
    const [title, setTitle] = useState<JSX.Element | string | null>();
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);

    const handleSetTitle = (value: JSX.Element | string | null | undefined) => {
        setTitle(value);
    };

    function swapComponent<T>(SidesheetContent?: CustomSidesheet<T>, props?: T) {
        openSidesheet(SidesheetContent, props, { color });
    }

    const actions: SidesheetApi = {
        closeSidesheet: closeSidesheet,
        setIsMinimized: setIsMinimized,
        setWidth: setWidth,
        setTitle: handleSetTitle,
        setMenuItems: setMenuItems,
        swapComponent: swapComponent,
    };

    const sidesheetProps = { item: props, actions: actions };

    if (!SidesheetComponent) return null;

    if (isMinimized) {
        return (
            //HACK: auto doesnt work?
            <div style={{ width: '24px' }}>
                <ColourTab appColor={color} onClick={handleMinimize}>
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
                        <ColourTab appColor={color} onClick={handleMinimize}>
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
