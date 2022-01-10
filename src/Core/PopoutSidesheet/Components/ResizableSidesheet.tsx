import { Resizable } from 're-resizable';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { useAtom } from '@dbeining/react-atom';
import { getSidesheetContext } from '../context/sidesheetContext';
import { useInternalSidesheetFunction } from '../Hooks/useInternalSidesheetFunction';

export const ResizableSidesheet = (): JSX.Element | null => {
    const { closeSidesheet, togglePinned } = useInternalSidesheetFunction();

    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const defaultWidth = 650;
    const [width, setWidth] = useState<number>(defaultWidth);

    const minWidth = 40;

    const { SidesheetComponent, props, isPinned } = useAtom(getSidesheetContext());

    const handleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    if (isMinimized) {
        return (
            <div>
                <Icon
                    name="chevron_left"
                    color={tokens.colors.interactive.primary__resting.hex}
                    onClick={handleMinimize}
                />
            </div>
        );
    }

    if (!SidesheetComponent) return null;

    return (
        <div>
            <Resizable
                size={{ width: width, height: '100%' }}
                maxWidth={'100vh'}
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
                    <span>
                        <Icon
                            name="chevron_right"
                            color={tokens.colors.interactive.primary__resting.hex}
                            onClick={handleMinimize}
                        />
                        <Icon
                            name={isPinned ? 'lock' : 'lock_open'}
                            onClick={togglePinned}
                            color={tokens.colors.interactive.primary__resting.hex}
                        />
                    </span>
                    <Icon
                        name="close"
                        color={tokens.colors.interactive.primary__resting.hex}
                        onClick={closeSidesheet}
                    />
                </Header>

                <SidesheetComponent {...props} />
            </Resizable>
        </div>
    );
};

const Header = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;
