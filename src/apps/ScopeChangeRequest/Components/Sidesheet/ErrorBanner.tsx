import { tokens } from '@equinor/eds-tokens';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { ServerError } from '../../Types/ScopeChange/ServerError';
import { useIsMounted } from '../../Hooks/useIsMounted';

export interface ErrorFormat {
    message: ServerError | undefined;
    requestId: string;
}

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ScopeChangeErrorBanner({ message, requestId }: ErrorFormat): JSX.Element {
    const [errorMessage, setErrorMessage] = useState<ServerError | null>(message ?? null);

    const isMounted = useIsMounted();

    useEffect(() => {
        if (!isMounted) return;
        if (message) {
            setErrorMessage(message ?? null);
        }
    }, [isMounted, message]);

    useEffect(() => {
        setErrorMessage(null);
        message = undefined;
    }, [requestId]);

    return (
        <div>
            {errorMessage && (
                <ErrorContainer>
                    <div>{message?.detail}</div>
                    <ErrorDetails>
                        {message?.validationErrors &&
                            Object.values(message.validationErrors).map((errorArray) => {
                                return (
                                    <>
                                        {errorArray.map((error) => (
                                            <div key={error}>{error}</div>
                                        ))}
                                    </>
                                );
                            })}
                    </ErrorDetails>
                </ErrorContainer>
            )}
        </div>
    );
}

const ErrorDetails = styled.div`
    flex-direction: column;
    gap: 0.5em;
    display: flex;
`;

const ErrorContainer = styled.div`
    min-width: 250px;
    min-height: 50px;
    width: -webkit-fill-available;
    height: auto;
    border-radius: 5px;
    background-color: ${tokens.colors.ui.background__danger.hex};
    display: flex;
    align-items: center;
    padding: 1em 1.5em;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
`;
