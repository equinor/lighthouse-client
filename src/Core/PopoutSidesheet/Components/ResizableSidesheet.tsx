import { Resizable } from 're-resizable';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { closeSidesheet } from '../Functions/closeSidesheet';
import { useAtom } from '@dbeining/react-atom';
import { getSidesheetContext } from '../context/sidesheetContext';

export const ResizableSidesheet = (): JSX.Element | null => {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(650);
    const { SidesheetComponent, props } = useAtom(getSidesheetContext());
    const handleClose = () => {
        setWidth(0);
        closeSidesheet();
    };

    const handleMinimize = () => {
        setIsMinimized((prev) => !prev);
    };

    if (isMinimized) {
        return (
            <div style={{ height: 'auto', width: 'auto' }}>
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
                size={{ width: width, height: 5 }}
                style={{
                    borderLeft: `2px solid ${tokens.colors.ui.background__medium.rgba}`,
                }}
                onResizeStop={(e, direction, ref, d) => {
                    setWidth(width + d.width);
                }}
            >
                <Header>
                    <Icon
                        name="chevron_right"
                        color={tokens.colors.interactive.primary__resting.hex}
                        onClick={handleMinimize}
                    />
                    <Icon
                        name="close"
                        color={tokens.colors.interactive.primary__resting.hex}
                        onClick={handleClose}
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
