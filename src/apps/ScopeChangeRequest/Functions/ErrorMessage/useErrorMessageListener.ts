import { useEffect, useState } from 'react';
import { channelName } from './channelName';
import { ErrorMessageFormat } from './errorMessageFormat';

interface ErrorMessageHandler {
    errors: ErrorMessageFormat[];
    removeErrors: (msg: ErrorMessageFormat) => void;
}

export function useErrorMessageListener(): ErrorMessageHandler {
    const [errors, setErrors] = useState<ErrorMessageFormat[]>([]);
    const channel = new BroadcastChannel(channelName);

    const appendErrors = (ev: ErrorMessageFormat) => {
        ev = { ...ev, title: ev?.title ?? 'Something went wrong' };
        if (!errors.find((x) => x.title === ev.title)) {
            setErrors((prev) => [...prev, ev]);
        }
    };

    const removeErrors = (msg: ErrorMessageFormat) =>
        setErrors((prev) => [...prev.filter((x) => JSON.stringify(x) !== JSON.stringify(msg))]);

    useEffect(() => {
        channel.onmessage = (event) => {
            debugger;
            const identifier: keyof ErrorMessageFormat = 'title';
            if (identifier in event?.data) {
                appendErrors(event.data);
            } else if (typeof event?.data === 'string') {
                appendErrors({ title: event.data });
            } else {
                appendErrors({ title: 'Unknown error' });
            }
        };

        return () => {
            channel.close();
        };
    }, [channel]);

    return {
        errors,
        removeErrors,
    };
}
