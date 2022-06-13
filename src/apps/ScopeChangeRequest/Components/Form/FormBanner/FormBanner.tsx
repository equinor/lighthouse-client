import { ScopeChangeRequestState } from '../../../types/scopeChangeRequest';
import { BannerItem, Banner } from '../../Sidesheet/SidesheetBanner/SidesheetBanner';
import { CategorySelect } from '../Inputs/CategorySelect/CategorySelect';
import { PhaseSelect } from '../Inputs/PhaseSelect/PhaseSelect';
import { ScopeSelect } from '../Inputs/ScopeSelect/ScopeSelect';

interface FormBannerProps {
    state: ScopeChangeRequestState | 'Voided';
}

export const FormBanner = ({ state }: FormBannerProps): JSX.Element => {
    return (
        <div>
            <Banner padding="0 1.75em">
                <BannerItem title="" value={<PhaseSelect />} />
                <BannerItem title="" value={<CategorySelect />} />
                <BannerItem title="" value={<ScopeSelect />} />
                <BannerItem title="State" value={state} />
            </Banner>
        </div>
    );
};
