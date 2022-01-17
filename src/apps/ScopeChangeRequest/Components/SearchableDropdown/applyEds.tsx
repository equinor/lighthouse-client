import { Button, Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Theme } from 'react-select';

// (255, 0, 0, 0.4)
/**
 * neutral 10 overlay color over selected items
 * netutral 20 cross and dropdown button
 * neutral 40 onHover neutral 20
 * neutral 80 onHover when bar is open
 *
 */
export const applyEDSTheme = (theme: Theme): Theme => ({
    ...theme,
    borderRadius: 0,
    colors: {
        ...theme.colors,
        neutral0: `${tokens.colors.ui.background__light.rgba}`,
        primary25: `${tokens.colors.ui.background__medium.rgba}`,
        primary: `${tokens.colors.interactive.primary__resting.rgba}`,
        primary50: '0,0,0,0,0',
        primary75: 'pink',
        danger: 'pink',
        dangerLight: 'orange',
        //overlay color over selected items
        neutral10: 'blue',
        neutral90: 'blue',
        // neutral5: used if disabled,
        //neutral 20 border color
        neutral20: 'transparent',
        //border on hover
        neutral30: '0,0,0,0,0',
        //No options text color
        neutral40: `${tokens.colors.text.static_icons__secondary.rgba}`,
        //Text color, make grey
        neutral50: `${tokens.colors.text.static_icons__secondary.rgba}`,
        neutral60: `${tokens.colors.interactive.primary__resting.rgba}`,
        neutral70: 'blue',
        neutral80: `${tokens.colors.interactive.primary__resting.rgba}`,
    },
});

export const applyEdsStyles = () => {
    return {
        indicatorsContainer: (styles) => ({
            ...styles,
        }),
        menuPortal: (styles) => ({
            ...styles,
        }),
        group: (styles) => ({
            ...styles,
        }),
        input: (styles) => ({
            ...styles,
        }),
        /**
         * Dropdown list
         */
        menu: (styles) => ({
            ...styles,
            borderBottom: '1px solid',
        }),
        container: (styles) => ({
            ...styles,
            height: '34px',
        }),
    };
};

interface EdsOverride {
    DropdownIndicator: () => JSX.Element;
    IndicatorSeparator: () => JSX.Element;
}

export const applyEdsComponents = (): EdsOverride => {
    return {
        DropdownIndicator: DownChevronOverride,
        IndicatorSeparator: RemoveLine,
    };
};

const DownChevronOverride = () => {
    return (
        <Button style={{ width: '25px', height: '25px' }} variant="ghost_icon">
            <Icon color={tokens.colors.interactive.primary__resting.rgba} name="search" />
        </Button>
    );
};

const RemoveLine = () => {
    return <></>;
};
