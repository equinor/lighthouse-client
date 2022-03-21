import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ServerError } from '../../Types/ScopeChange/ServerError';
import { useErrorMessageListener } from '../../Functions/ErrorMessage/useErrorMessageListener';
import { Button } from '@equinor/eds-core-react';

export interface ErrorFormat {
    message: ServerError | undefined;
    requestId: string;
}

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ScopeChangeErrorBanner(): JSX.Element {
    const { errors, removeErrors } = useErrorMessageListener();

    return (
        <div>
            {errors &&
                errors.map((message) => (
                    <ErrorContainer key={message.title}>
                        <div>{message.title}</div>
                        <ErrorDetails>{message.description}</ErrorDetails>
                        <Button variant="outlined" onClick={() => removeErrors(message)}>
                            Dismiss
                        </Button>
                    </ErrorContainer>
                ))}
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
    min-height: 15px;
    width: -webkit-fill-available;
    height: auto;
    border-radius: 5px;
    background-color: ${tokens.colors.ui.background__danger.hex};
    display: flex;
    align-items: center;
    padding: 1em 1em;
    display: flex;
    flex-direction: column;
    gap: 0.7em;
`;
