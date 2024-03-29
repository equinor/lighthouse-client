import { ScopeChangeRequestState } from '../../../types/scopeChangeRequest';
import { BannerItem, Banner } from '../../Sidesheet/SidesheetBanner/SidesheetBanner';
import { CategorySelect } from '../Inputs/CategorySelect/CategorySelect';
import { PhaseSelect } from '../Inputs/PhaseSelect/PhaseSelect';
import { ScopeSelect } from '../Inputs/ScopeSelect/ScopeSelect';

export const FormBanner = ({
  state,
}: {
  state: ScopeChangeRequestState | undefined;
}): JSX.Element => {
  return (
    <div>
      <Banner padding="0 1.75em">
        <BannerItem title="" value={<PhaseSelect />} />
        <BannerItem title="" value={<CategorySelect />} />
        <BannerItem title="" value={<ScopeSelect />} />
        <BannerItem title="State" value={<div>{state ? state : 'Draft'}</div>} />
      </Banner>
    </div>
  );
};
