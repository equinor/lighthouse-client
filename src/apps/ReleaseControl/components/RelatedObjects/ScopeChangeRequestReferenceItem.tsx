import { openSidesheetById } from '@equinor/sidesheet';
import { ScopeChangeRequestReference } from '@equinor/Workflow';

import { Link, TextWrapper, Wrapper, MainText } from './WrapperStyles';

interface ScopeChangeRequestReferenceProps {
  scopeChangeRequestReference: ScopeChangeRequestReference;
}

export const ScopeChangeRequestReferenceItem = ({
  scopeChangeRequestReference,
}: ScopeChangeRequestReferenceProps): JSX.Element => {
  return (
    <Wrapper
      onClick={() =>
        openSidesheetById('change', scopeChangeRequestReference.scopeChangeReferenceId)
      }
      key={scopeChangeRequestReference.scopeChangeReferenceId}
    >
      <TextWrapper>
        <MainText>
          <Link>{scopeChangeRequestReference.scopeChangeReferenceSerialNumber}</Link>-{' '}
          <div>{scopeChangeRequestReference?.scopeChangeReferenceTitle}</div>
        </MainText>
      </TextWrapper>
    </Wrapper>
  );
};
