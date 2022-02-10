import { Banner, Icon, Button } from '@equinor/eds-core-react';
import { useEffect, useState } from 'react';

export interface ErrorFormat {
    message: string | undefined;
    timestamp: Date | undefined;
}

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ScopeChangeErrorBanner({ message, timestamp }: ErrorFormat): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<string | null>(message ?? null);

    useEffect(() => {
        setErrorMessage(message ?? null);
    }, [message, timestamp]);

    return (
        <>
            {errorMessage && (
                <Banner>
                    <Banner.Icon variant="warning">
                        <Icon name="mood_sad" />
                    </Banner.Icon>
                    <Banner.Message>{`${message}`}</Banner.Message>
                    <Banner.Actions>
                        <Button onClick={() => setErrorMessage(null)}>Dismiss</Button>
                    </Banner.Actions>
                </Banner>
            )}
        </>
    );
}
