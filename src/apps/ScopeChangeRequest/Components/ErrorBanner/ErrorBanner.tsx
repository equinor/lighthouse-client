import { useErrorMessageListener } from '../../functions/ErrorMessage/useErrorMessageListener';
import { ClickableIcon } from '../../../../components/Icon/ClickableIcon';
import { ErrorContainer, Inline, ErrorDetails } from './ErrorBanner.styles';
import { useEffect } from 'react';

interface ScopeChangeErrorBanner {
  clearOnPropChange?: any;
}

/**
 * Provides a uniform banner for error messages in the sidesheet
 * @returns
 */
export function ScopeChangeErrorBanner({ clearOnPropChange }: ScopeChangeErrorBanner): JSX.Element {
  const { errors, removeErrors } = useErrorMessageListener();

  useEffect(() => {
    errors.forEach((s) => removeErrors(s));
  }, [clearOnPropChange]);

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
