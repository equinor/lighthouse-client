import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '../../../Core/AppBuilder/Types';
import Icon from '../../Icon/Icon';
import { IconWrapper, MenuIcon, Wrapper } from './ManuIconStyles';

interface MenuIconProps {
    item: AppManifest;
    isProd?: boolean;
    isExpanded?: boolean;
    onMouseOver?: () => void;
    onBlur?: () => void;
    onFocus?: () => void;
    active?: boolean;
}

export const MenuItem = ({
    item,
    isProd,
    isExpanded,
    onMouseOver,
    onBlur,
    onFocus,
    active,
}: MenuIconProps): JSX.Element => {
    const CustomIcon = item.icon;
    return (
        <Wrapper
            to={`/${item.shortName}`}
            title={!item.isProduction && isProd ? 'Disabled' : item.title}
            style={item.isProduction && !isProd ? { color: '#e3e3e3' } : {}}
            onMouseOver={onMouseOver}
            onBlur={onBlur}
            onFocus={onFocus}
        >
            <IconWrapper active={active}>
                <MenuIcon>
                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}

                    {CustomIcon && typeof CustomIcon === 'string' && (
                        <Icon
                            name={CustomIcon}
                            title={item.title}
                            color={tokens.colors.text.static_icons__secondary.rgba}
                        />
                    )}
                </MenuIcon>
            </IconWrapper>
            {isExpanded && <span>{item.title}</span>}
        </Wrapper>
    );
};
