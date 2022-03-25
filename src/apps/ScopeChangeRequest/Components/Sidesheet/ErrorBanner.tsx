import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';
import { ServerError } from '../../Types/ScopeChange/ServerError';
import { useErrorMessageListener } from '../../Functions/ErrorMessage/useErrorMessageListener';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';

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
                        <Inline>
                            <span></span>
                            <div>{message.title}</div>
                            <ClickableIcon name="close" onClick={() => removeErrors(message)} />
                        </Inline>
                        <ErrorDetails>{message.description}</ErrorDetails>
                    </ErrorContainer>
                ))}
        </div>
    );
}
const Inline = styled.div`
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

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
