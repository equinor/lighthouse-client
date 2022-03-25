import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ErrorBoundary } from '@equinor/ErrorBoundary';
import { Resizable } from 're-resizable';
import { useEffect } from 'react';
import styled from 'styled-components';
import ErrorFallbackSidesheet from '../../../Core/ErrorBoundary/Components/ErrorFallbackSidesheet';
import { useSideSheet } from '../context/sidesheetContext';
import { useInternalSidesheetFunction } from '../Hooks/useInternalSidesheetFunction';

export const ResizableSidesheet = (): JSX.Element | null => {
    const { SidesheetComponent, props, isPinned, minWidth, width, isMinimized } = useSideSheet();
    const { closeSidesheet, togglePinned, setIsMinimized, setWidth } =
        useInternalSidesheetFunction();

    const handleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    useEffect(() => {
        /** Makes it impossible to resize sidesheet on mount?? */
        // SidesheetComponent && setWidth(defaultWidth);
        return () => {
            isPinned && setWidth(0);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (isMinimized) {
        return (
            <Button variant="ghost_icon" onClick={handleMinimize}>
                <Icon name="chevron_left" color={tokens.colors.interactive.primary__resting.hex} />
            </Button>
        );
    }

    if (!SidesheetComponent) return null;

    return (
        <div style={{ height: '100%' }}>
            <Resizable
                size={{ width: width, height: '100%' }}
                // maxWidth={'100vh'}
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
                    <Button variant="ghost_icon" onClick={handleMinimize}>
                        <Icon
                            name="chevron_right"
                            size={24}
                            color={tokens.colors.interactive.primary__resting.hex}
                        />
                    </Button>

                    <span>
                        <Button variant="ghost_icon" onClick={togglePinned}>
                            <Icon
                                name={'thumb_pin'}
                                size={24}
                                color={
                                    isPinned
                                        ? tokens.colors.interactive.primary__resting.hex
                                        : 'grey'
                                }
                            />
                        </Button>
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
                        <SidesheetComponent {...props} />
                    </div>
                </ErrorBoundary>
            </Resizable>
        </div>
    );
};

const Header = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
    height: 5%;
`;
