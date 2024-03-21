import { Checkbox } from '@equinor/eds-core-react-old';
import { useScopeChangeContext } from '../../hooks/context/useScopeChangeContext';
import { CheckboxWrapper } from './warrantyCaseDetailCheckbox.styles';

export const WarrantyCaseDetailCheckbox = (): JSX.Element => {
  const potentialWarrantyCase = useScopeChangeContext((s) => s.request.potentialWarrantyCase);

  return (
    <CheckboxWrapper>
      <Checkbox crossOrigin={undefined} readOnly={true} disabled checked={potentialWarrantyCase} />{' '}
      Potential warranty case
    </CheckboxWrapper>
  );
};
