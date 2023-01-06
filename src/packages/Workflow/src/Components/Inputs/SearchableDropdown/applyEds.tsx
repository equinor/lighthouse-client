import { Button, Icon, Progress } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { components, Theme } from 'react-select';
import styled from 'styled-components';

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
        //disabled
        neutral10: 'grey',
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

const Loading = styled.div`
    padding: 0rem 1rem;
`;

const LoadingIndicator = () => {
    return (
        <Loading>
            <Progress.Dots color="primary" />
        </Loading>
    );
};

const ControlWrapper = styled.div`
    height: auto;
    width: -webkit-fill-available;
`;

const ControlComponent = (props: any) => {
    return (
        <ControlWrapper>
            <components.Control {...props} />
        </ControlWrapper>
    );
};

const SelectContainer = ({ children, ...props }: any) => {
    return (
        <ControlWrapper>
            <components.SelectContainer {...props}>{children}</components.SelectContainer>
        </ControlWrapper>
    );
};

interface EdsOverride {
    DropdownIndicator: () => JSX.Element;
    IndicatorSeparator: () => JSX.Element;
    LoadingIndicator: () => JSX.Element;
    Control: (props: any) => JSX.Element;
    SelectContainer: (props: any) => JSX.Element;
}

export const applyEdsComponents = (): EdsOverride => {
    return {
        DropdownIndicator: DownChevronOverride,
        IndicatorSeparator: RemoveLine,
        LoadingIndicator: LoadingIndicator,
        Control: ControlComponent,
        SelectContainer,
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
