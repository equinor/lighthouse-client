import { useErrorMessageListener } from '../../sFunctions/ErrorMessage/useErrorMessageListener';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { ErrorContainer, Inline, ErrorDetails } from './ErrorBanner.styles';

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ScopeChangeErrorBanner(): JSX.Element {
    const { errors, removeErrors } = useErrorMessageListener();

    return (
        <>
            {errors &&
                errors.map((message) => (
                    <ErrorContainer key={message.title}>
                        <Inline>
                            <div>{message.title}</div>
                            <ClickableIcon name="close" onClick={() => removeErrors(message)} />
                        </Inline>
                        <ErrorDetails>{message.description}</ErrorDetails>
                    </ErrorContainer>
                ))}
        </>
    );
}
