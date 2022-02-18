import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { httpClient } from '@equinor/portal-client';
import { useEffect, useMemo, useState } from 'react';
import Icon from '../../../Icon/Icon';
import { Banner } from './ServiceMessageBannerStyles';

export interface ServiceMessage {
    message?: string;
    link?: {
        url: string;
        title: string;
    };

    type?: 'info' | 'warning' | 'default';
}

interface SystemBannerProps extends ServiceMessage {
    handleClose(): void;
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
        icon: 'warning_outlined',
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
        iconColor: tokens.colors.interactive.danger__text.rgba,
        icon: 'warning_outlined',
        buttonColor: 'secondary',
        background: tokens.colors.ui.background__default.rgba,
    },
};

interface Return extends ServiceMessage {
    isActive: boolean;
    handleClose(): void;
}

export function useServiceMessage(): Return {
    const { customHttpClient } = useMemo(
        () =>
            httpClient({
                scope: 'api://ffaae7c8-a790-47e9-81cf-286b1ca380ce/default',
                baseUrl: '',
            }),
        []
    );

    const [isActive, setIsActive] = useState<boolean>(false);
    const [message, setMessage] = useState<ServiceMessage | undefined>();

    function handleClose() {
        setIsActive(false);
    }

    useEffect(() => {
        (async () => {
            const response = await customHttpClient.get('http://localhost:7071/api/serviceMessage');
            const data = await response.json();
            // TODO add local storage support to dismiss message.
            if (data.message) {
                setMessage(data);
                setIsActive(true);
            }
        })();
    }, [customHttpClient]);

    return {
        ...message,
        isActive,
        handleClose,
    };
}

export function ServiceMessageBanner({
    handleClose,
    message,
    type,
    link,
}: SystemBannerProps): JSX.Element {
    const { iconColor, icon, buttonColor, background } = systemBannerMap[type || 'default'];

    return (
        <Banner iconColor={iconColor} background={background}>
            <Banner.Icon>
                <Icon name={icon} />
            </Banner.Icon>
            {/* <Banner.Message> */}
            <pre>
                {message || ''}
                {link && <a href={link.url}>{link.title}</a>}
            </pre>
            {/* </Banner.Message> */}
            <Banner.Actions>
                <Button variant="ghost" color={buttonColor} onClick={handleClose}>
                    <Icon name="close" />
                    Close
                </Button>
            </Banner.Actions>
        </Banner>
    );
}
