import { DateTime } from 'luxon';
import { useEffect, useState } from 'react';

export function useIntervalTimestamp(timeInMs: number): string | null {
    const [timestamp, setTimestamp] = useState<string | null>(makeTimestamp(timeInMs));

    function makeTimestamp(timeInMs: number): string | null {
        if (typeof timeInMs !== 'number') return null;
        return DateTime.fromMillis(timeInMs).toRelative({ unit: 'minutes' });
    }

    useEffect(() => {
        setTimestamp(makeTimestamp(timeInMs));
        setInterval(() => setTimestamp(makeTimestamp(timeInMs)), 1000 * 60);
    }, [timeInMs]);

    return timestamp;
}
