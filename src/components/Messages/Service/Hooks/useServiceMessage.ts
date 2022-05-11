import { storage } from '@equinor/lighthouse-utils';
import { httpClient } from '@equinor/portal-client';
import { useEffect, useMemo, useState } from 'react';
import { ServiceMessage } from '../Types/serviceMessage';

const SM_KEY = 'serviceMessageId';

interface Return {
    message?: ServiceMessage;
    isActive: boolean;
    handleClose(message?: ServiceMessage): void;
}

export function useServiceMessage(): Return {
    const { appConfig } = useMemo(() => httpClient(), []);
    const [isActive, setIsActive] = useState<boolean>(false);
    const [message, setMessage] = useState<ServiceMessage | undefined>();

    function handleClose(message?: ServiceMessage) {
        setIsActive(false);
        if (message) {
            storage.setItem(SM_KEY, message.id);
        }
    }

    function localMessage(message?: ServiceMessage): ServiceMessage | undefined {
        const localMessageId = storage.getItem<string>(SM_KEY);
        if (localMessageId && message?.id === localMessageId) {
            setIsActive(false);
            return;
        }
        return message;
    }

    useEffect(() => {
        (async () => {
            const response = await appConfig.get('api/serviceMessage');
            const data = localMessage(await response.json());
            if (data && data.id) {
                setMessage(data);
                setIsActive(true);
            }
        })();
    }, [appConfig]);

    return {
        message,
        isActive,
        handleClose,
    };
}
