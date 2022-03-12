import { httpClient } from '@equinor/portal-client';
import { useMemo } from 'react';
import { ServiceMessage } from '../Types/serviceMessage';

interface Return {
    postMessage(message: ServiceMessage): Promise<void>;
}

export function usePostServiceMessage(): Return {
    const { appConfig } = useMemo(() => httpClient(), []);

    async function postMessage(message?: ServiceMessage) {
        const response = await appConfig.post('/api/serviceMessage', {
            body: JSON.stringify(message),
        });
        console.log(response);
    }

    return {
        postMessage,
    };
}
