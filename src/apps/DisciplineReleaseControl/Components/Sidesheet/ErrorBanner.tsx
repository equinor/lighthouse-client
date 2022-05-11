import { Banner, Button, Icon } from '@equinor/eds-core-react';
import { useIsMounted } from '@equinor/lighthouse-utils';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ServerError } from '../../Api/Types/ServerError';

export interface ErrorFormat {
    message: ServerError | undefined;
}

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ReleaseControlErrorBanner({ message }: ErrorFormat): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<ServerError | null>(message ?? null);

    const isMounted = useIsMounted();

    useEffect(() => {
        if (!isMounted) return;
        if (message) {
            setErrorMessage(message ?? null);
        }
    }, [message]);

    return (
        <>
            {errorMessage && (
                <div>
                    <Banner>
                        <Banner.Icon variant="warning">
                            <Icon name="mood_sad" />
                        </Banner.Icon>
                        <ErrorMessageContainer>
                            <Banner.Message>{`${message?.detail}`}</Banner.Message>
                            {message?.validationErrors &&
                                Object.values(message.validationErrors).map((errorArray) => {
                                    return (
                                        <>
                                            {errorArray.map((error) => (
                                                <Banner.Message key={error}>{error}</Banner.Message>
                                            ))}
                                        </>
                                    );
                                })}
                        </ErrorMessageContainer>
                        <Banner.Actions>
                            <Button
                                onClick={() => {
                                    setErrorMessage(null);
                                    message = undefined;
                                }}
                            >
                                Dismiss
                            </Button>
                        </Banner.Actions>
                    </Banner>
                </div>
            )}
        </>
    );
}

const ErrorMessageContainer = styled.div`
    display: flex;
    flex-direction: column;
`;
