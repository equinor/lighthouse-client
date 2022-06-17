import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/lighthouse-components';
import { useModelViewerContext } from '../context/modelViewerContext';
import { Menu, WrapperMenu } from '../ModelViewerStyles';

export interface SelectionAction {
    icon: React.FC;
    disabled?: boolean;
    title: string;
    onClick: () => void;
}
interface SelectionMenuProps {
    selectionActions?: SelectionAction[];
}

export const SelectionMenu = ({ selectionActions }: SelectionMenuProps): JSX.Element | null => {
    const {
        selection,
        toggleClipping,
        toggleDefaultColor,
        hasDefaultColor,
        isCropped,
        toggleHide,
        modelIsVisible,
    } = useModelViewerContext();

    if (!selection) return null;

    return (
        <WrapperMenu>
            <Menu>
                <Button
                    variant="ghost_icon"
                    onClick={() => {
                        toggleClipping();
                    }}
                >
                    <Icon
                        name={'crop'}
                        color={
                            isCropped ? tokens.colors.text.static_icons__secondary.rgba : undefined
                        }
                    />
                </Button>
                <Button
                    variant="ghost_icon"
                    onClick={() => {
                        toggleHide();
                    }}
                >
                    <Icon
                        name={'visibility'}
                        color={
                            modelIsVisible
                                ? tokens.colors.text.static_icons__secondary.rgba
                                : undefined
                        }
                    />
                </Button>
                {/* todo add dynamic buttons */}
                {selectionActions?.map((action, index) => (
                    <Button
                        key={index}
                        title={action.title}
                        variant="ghost_icon"
                        disabled={action.disabled}
                        onClick={() => {
                            action.onClick();
                        }}
                    >
                        <action.icon />
                    </Button>
                ))}

                <Button
                    variant="ghost_icon"
                    onClick={() => {
                        toggleDefaultColor();
                    }}
                >
                    <Icon
                        name={'color_palette'}
                        color={
                            hasDefaultColor
                                ? undefined
                                : tokens.colors.text.static_icons__secondary.rgba
                        }
                    />
                </Button>
                <Button
                    title="View selection"
                    variant="ghost_icon"
                    onClick={() => {
                        selection.fitCameraToCurrentBoundingBox();
                    }}
                >
                    <Icon
                        name={'fullscreen'}
                        color={tokens.colors.text.static_icons__secondary.rgba}
                    />
                </Button>
            </Menu>
        </WrapperMenu>
    );
};
