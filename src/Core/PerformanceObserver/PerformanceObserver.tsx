import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useSettings } from '@equinor/lighthouse-portal-client';
import { usePerformanceObserver } from './usePerformanceObserver';

export function PerformanceObserver(): JSX.Element {
    const status = usePerformanceObserver({});
    const { clientEnv } = useSettings();

    return (
        <>
            {clientEnv === 'dev' && (
                <Icon
                    name="report_bug"
                    color={
                        status === 'Healthy'
                            ? tokens.colors.interactive.primary__resting.hex
                            : status === 'Warning'
                            ? tokens.colors.interactive.warning__resting.hex
                            : tokens.colors.infographic.primary__energy_red_100.hex
                    }
                />
            )}
        </>
    );
}
