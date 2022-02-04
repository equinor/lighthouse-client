import { tokens } from '@equinor/eds-tokens';
import { AppManifest } from '@equinor/portal-client';
import { Apps } from '../../../../apps/apps';
import Icon from '../../../Icon/Icon';
import { IconContainer, IconWrapper, LinkWrapper, Title, Wrapper } from './TopItemsStyles';

interface TopItemsProps {
    apps: Record<string, AppManifest[]>;
    openPopover: (type: string) => void;
    isExpanded: boolean;
}

export const TopItems = ({ apps, openPopover, isExpanded }: TopItemsProps): JSX.Element => {
    return (
        <Wrapper>
            {apps[Apps.Top] &&
                apps[Apps.Top].map((item) => {
                    const CustomIcon = item.icon;
                    return (
                        <LinkWrapper
                            key={`link-${item.shortName}`}
                            to={`/${item.shortName}`}
                            onMouseOver={() => {
                                openPopover('');
                            }}
                        >
                            <IconWrapper active={false}>
                                <IconContainer>
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                                    {CustomIcon && typeof CustomIcon === 'string' && (
                                        <Icon
                                            name={CustomIcon}
                                            title={item.title}
                                            color={tokens.colors.text.static_icons__secondary.rgba}
                                        />
                                    )}
                                </IconContainer>
                            </IconWrapper>
                            {isExpanded && <Title>{item.title}</Title>}
                        </LinkWrapper>
                    );
                })}
        </Wrapper>
    );
};
