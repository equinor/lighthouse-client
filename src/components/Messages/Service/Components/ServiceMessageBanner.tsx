import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import Icon from '../../../Icon/Icon';
import { ServiceMessage } from '../Types/serviceMessage';
import { Banner } from './ServiceMessageBannerStyles';

interface SystemBannerProps {
    message?: ServiceMessage;
    handleClose(message?: ServiceMessage): void;
}

interface SystemBannerMap {
    [key: string]: {
        iconColor: string;
        icon: string;
        buttonColor: 'primary' | 'danger' | 'secondary' | undefined;
        background: string;
    };
}

const systemBannerMap: SystemBannerMap = {
    info: {
        iconColor: tokens.colors.infographic.substitute__blue_ocean.rgba,
        icon: 'info_circle',
        buttonColor: 'primary',
        background: tokens.colors.ui.background__info.rgba,
    },
    warning: {
        iconColor: tokens.colors.interactive.danger__text.rgba,
        icon: 'warning_outlined',
        buttonColor: 'danger',
        background: tokens.colors.ui.background__danger.rgba,
    },
    default: {
        iconColor: tokens.colors.infographic.substitute__blue_ocean.rgba,
        icon: 'info_circle',
        buttonColor: 'secondary',
        background: tokens.colors.ui.background__default.rgba,
    },
};

export function ServiceMessageBanner({
    handleClose,
    message,
}: SystemBannerProps): JSX.Element | null {
    if (!message) return null;
    const { iconColor, icon, buttonColor, background } = systemBannerMap[message.type || 'default'];
    return (
        <Banner iconColor={iconColor} background={background}>
            <Banner.Icon>
                <Icon name={icon} />
            </Banner.Icon>
            <pre>
                {message.message || ''}
                {message.link && <a href={message.link.url}>{message.link.title}</a>}
            </pre>
            <Banner.Actions>
                <Button variant="ghost" color={buttonColor} onClick={() => handleClose(message)}>
                    <Icon name="close" />
                    Close
                </Button>
            </Banner.Actions>
        </Banner>
    );
}
