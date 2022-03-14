import { useCallback, useEffect, useState } from 'react';

type Status = 'Healthy' | 'Warning' | 'Error';

interface PerformanceObserverParams {
    callback?: (list: PerformanceObserverEntryList) => void | undefined;
    fetchCallback?: (list: ApiEvent[]) => void;
}

export function usePerformanceObserver(args?: PerformanceObserverParams): Status {
    const [status, setStatus] = useState<Status>('Healthy');

    useEffect(() => {
        const observer = new PerformanceObserver(observerHandler);
        observer.observe({ entryTypes: ['resource'] });

        return () => {
            observer.disconnect();
        };
    }, []);

    const observerHandler = useCallback(
        (list: PerformanceObserverEntryList): void => {
            args?.callback && args.callback(list);
            const perfEntries: ApiEvent[] = list
                .getEntries()
                .map((x) => x.toJSON())
                .filter((x: ApiEvent) => x.initiatorType === 'fetch');

            args?.fetchCallback && args.fetchCallback(perfEntries);
            if (perfEntries.length > 25) {
                setStatus('Warning');
            }
            if (perfEntries.length > 50) {
                setStatus('Error');
            }
        },
        [args]
    );

    return status;
}

export interface ApiEvent {
    name: string;
    entryType: 'resource';
    startTime: number;
    duration: number;
    initiatorType: 'fetch';
    nextHopProtocol: string;
    workerStart: number;
    redirectStart: number;
    redirectEnd: number;
    fetchStart: number;
    domainLookupStart: number;
    domainLookupEnd: number;
    connectStart: number;
    connectEnd: number;
    secureConnectionStart: number;
    requestStart: number;
    responseStart: number;
    responseEnd: number;
    transferSize: number;
    encodedBodySize: number;
    decodedBodySize: number;
    serverTiming: [];
    workerTiming: [];
}
