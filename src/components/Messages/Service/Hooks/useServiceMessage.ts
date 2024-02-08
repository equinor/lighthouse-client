import { useHttpClient } from '@equinor/lighthouse-portal-client';
import { storage } from '@equinor/lighthouse-utils';
import { useEffect, useState } from 'react';
import { ServiceMessage } from '../Types/serviceMessage';

const SM_KEY = 'serviceMessageId';

interface Return {
    message?: ServiceMessage;
    isActive: boolean;
    handleClose(message?: ServiceMessage): void;
}

export function useServiceMessage(): Return {
    const appConfig = useHttpClient('appConfig');

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
            const response = window.SERVICE_MESSAGE;
            if (!response || response.length == 0) return;
            try {
                const message = JSON.parse(response);
                const data: ServiceMessage = {
                    message: message.message,
                    type: message.type,
                    link: undefined,
                    id: btoa(message.message),
                    fromDate: '2019-02-09',
                    toDate: '2030-02-09',
                };
                const maybeMessage = localMessage(data);
                if (maybeMessage && maybeMessage.id) {
                    setMessage(maybeMessage);
                    setIsActive(true);
                }
            } catch (e) {
                console.error('Failed to load service message');
            }
        })();
    }, [appConfig]);

    return {
        message,
        isActive,
        handleClose,
    };
}
