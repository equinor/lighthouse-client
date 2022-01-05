import { Resizable } from 're-resizable';
import styled from 'styled-components';
import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useState } from 'react';
import { clearActiveScrim } from '../Functions/clearActiveScrim';

interface ResizableSidesheetProps {
    children: React.ReactChild;
}

export const ResizableSidesheet = ({ children }: ResizableSidesheetProps): JSX.Element => {
    const [isMinimized, setIsMinimized] = useState<boolean>(false);
    const [width, setWidth] = useState<number>(320);

    const handleClose = () => {
        setWidth(0);
        clearActiveScrim();
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

    return (
        <div>
            <Resizable
                size={{ width: width, height: '100vh' }}
                style={{ borderLeft: `2px solid ${tokens.colors.ui.background__medium.rgba}` }}
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
                {children}
            </Resizable>
        </div>
    );
};

const Header = styled.div`
    display: flex;
    padding: 5px;
    justify-content: space-between;
`;
