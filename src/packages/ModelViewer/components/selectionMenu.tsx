import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Icon } from '@equinor/lighthouse-components';
import { useModelViewerContext } from '../context/modelViewerContext';
import { Menu, WrapperMenu } from '../ModelViewerStyles';

export const SelectionMenu = (): JSX.Element | null => {
    const {
        selection,
        toggleClipping,
        toggleDefaultColor,
        hasDefaultColor,
        isCropped,
        tagsIsVisible,
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
                {/* <Button
                    title="Hidden"
                    variant="ghost_icon"
                    onClick={() => {
                        selection?.setHideMode('Hidden');
                    }}
                >
                    <ElectroIcon color={tokens.colors.interactive.primary__resting.rgba} />
                </Button>

                <Button variant="ghost_icon" onClick={() => {}}>
                    <Icon
                        name={'tag'}
                        color={
                            tagsIsVisible
                                ? tokens.colors.interactive.primary__selected_highlight.rgba
                                : undefined
                        }
                    />
                </Button> */}
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
            </Menu>
        </WrapperMenu>
    );
};
