import { useCallback, useEffect, useState } from 'react';
import { channelName } from './channelName';
import { ErrorMessageFormat } from './errorMessageFormat';

interface ErrorMessageHandler {
    errors: ErrorMessageFormat[];
    removeErrors: (msg: ErrorMessageFormat) => void;
}

export function useErrorMessageListener(): ErrorMessageHandler {
    const [errors, setErrors] = useState<ErrorMessageFormat[]>([]);

    const appendErrors = useCallback((ev: ErrorMessageFormat) => {
        setErrors((prev) => [...prev.filter(({ title }) => title !== ev.title), ev]);
    }, []);

    const removeErrors = (msg: ErrorMessageFormat) =>
        setErrors((prev) => [...prev.filter((x) => JSON.stringify(x) !== JSON.stringify(msg))]);

    useEffect(() => {
        const channel = new BroadcastChannel(channelName);
        channel.onmessage = (event) => {
            if (isValidErrorMessage(event)) {
                appendErrors(event.data);
            }
        };

        return () => {
            channel.close();
        };
    }, [appendErrors]);

    return {
        errors,
        removeErrors,
    };
}

/**
 * Checks if the error message posted is valid
 * @param event
 * @returns
 */
function isValidErrorMessage(event: MessageEvent<any>): boolean {
    const required: (keyof ErrorMessageFormat)[] = ['queryKey', 'title', 'type'];
    return required.every((value) => Object.keys(event.data).includes(value));
}
