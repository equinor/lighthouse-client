import { Banner } from '@equinor/eds-core-react';
import { useQuery } from 'react-query';
import { ScopeChangeFormModel } from '../../../hooks/form/useScopeChangeFormState';
import { scopeChangeQueries } from '../../../keys/queries';
import { Scope } from '../../../types/scopeChangeRequest';
import { BannerItem } from '../../Sidesheet/SidesheetBanner/SidesheetBanner';
import { AsyncSingleSelect } from '../AsyncSingleSelect';

interface CreateBannerInputsProps {
    state: Partial<ScopeChangeFormModel>;
    handleInput: (key: keyof ScopeChangeFormModel, value: unknown) => void;
}

export const CreateBannerInputs = ({
    state,
    handleInput,
}: CreateBannerInputsProps): JSX.Element => {
    const { phaseQuery, categoryQuery, scopeQuery } = scopeChangeQueries;
    const { data: phases, isLoading: isPhasesLoading } = useQuery(phaseQuery);
    const { data: categories, isLoading: isCategoriesLoading } = useQuery(categoryQuery);
    const { data: scopes, isLoading: isScopesLoading } = useQuery(scopeQuery);

    function handleCategoryChanged(selectedItem?: string | null | undefined) {
        handleInput(
            'changeCategory',
            categories?.find(({ name }) => name === selectedItem)
        );
    }

    function handleScopeChanged(selectedItem?: string | null | undefined) {
        handleInput('scopeId', getScopeIdFromName(scopes ?? [], selectedItem));
    }

    function handlePhaseChanged(selectedItem?: string | null | undefined) {
        handleInput('phase', selectedItem);
    }

    return (
        <div>
            <Banner>
                <BannerItem
                    title=""
                    value={
                        <AsyncSingleSelect
                            items={phases ?? []}
                            label={'Phase'}
                            meta="(Required)"
                            initialSelectedItem={state.phase}
                            placeholder="Select phase"
                            handleSelectedItemChange={({ selectedItem }) =>
                                handlePhaseChanged(selectedItem)
                            }
                            isLoading={isPhasesLoading}
                        />
                    }
                />

                <BannerItem
                    title=""
                    value={
                        <AsyncSingleSelect
                            items={categories?.map(({ name }) => name) ?? []}
                            label={'Change category'}
                            meta="(Required)"
                            initialSelectedItem={state.changeCategory?.name}
                            placeholder="Select category"
                            disabled={false}
                            handleSelectedItemChange={({ selectedItem }) =>
                                handleCategoryChanged(selectedItem)
                            }
                            isLoading={isCategoriesLoading}
                        />
                    }
                />

                <BannerItem
                    title=""
                    value={
                        <AsyncSingleSelect
                            items={scopes?.map(({ name }) => name) ?? []}
                            label={'Scope'}
                            meta="(Required)"
                            initialSelectedItem={state?.scope?.name}
                            placeholder="Select scope"
                            disabled={false}
                            handleSelectedItemChange={({ selectedItem }) =>
                                handleScopeChanged(selectedItem)
                            }
                            isLoading={isScopesLoading}
                        />
                    }
                />

                <BannerItem title="State" value={<div>Draft</div>} />
            </Banner>
        </div>
    );
};

function getScopeIdFromName(scopes: Scope[], scopeName: string | null | undefined) {
    return scopes.find(({ name }) => name === scopeName)?.id;
}
