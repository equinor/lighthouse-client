import { Button } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { httpClient } from '@equinor/portal-client';
import { useEffect, useMemo, useState } from 'react';
import Icon from '../../../Icon/Icon';
import { Banner } from './SystemMassageStyles';

export interface SystemMessage {
    message?: string;
    type?: 'info' | 'warning' | 'default';
}

interface SystemBannerProps extends SystemMessage {
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

interface Return extends SystemMessage {
    isActive: boolean;
    handleClose(): void;
}

export function useSystemMessage(): Return {
    const { appConfig } = useMemo(() => httpClient(), []);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [message, setMessage] = useState<SystemMessage | undefined>();

    function handleClose() {
        setIsActive(false);
    }

    useEffect(() => {
        (async () => {
            const response = await appConfig.get('api/serviceMessage');
            const data = await response.json();

            if (data.message) {
                setMessage(data);
                setIsActive(true);
            }
        })();
    }, [appConfig]);

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
}: SystemBannerProps): JSX.Element {
    const { iconColor, icon, buttonColor, background } = systemBannerMap[type || 'default'];

    return (
        <Banner iconColor={iconColor} background={background}>
            <Banner.Icon>
                <Icon name={icon} />
            </Banner.Icon>
            <Banner.Message>{message || ''}</Banner.Message>
            <Banner.Actions>
                <Button variant="ghost" color={buttonColor} onClick={handleClose}>
                    <Icon name="close" />
                    Close
                </Button>
            </Banner.Actions>
        </Banner>
    );
}
