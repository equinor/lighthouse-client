import { Progress } from '@equinor/eds-core-react';
import { FAMTypes, TypedSelectOption, useFAMSearch } from '@equinor/Workflow';
import { useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { HtCableTable } from './HtCableTable';
import { Select } from './ScopeSelect';
import { LoadingWrapper, SearchWrapper, Section } from './search.styles';
import { RcScopeHtTag } from '../../../../types/releaseControl';

interface SearchHtCablesProps {
    onChange: (newHtCables: TypedSelectOption[]) => void;
    htCables: TypedSelectOption[];
}

export const SearchHtCables = ({ onChange, htCables }: SearchHtCablesProps): JSX.Element => {
    const { getSignal, abort } = useCancellationToken();

    const { searchFAM } = useFAMSearch();

    const [loading, setLoading] = useState<boolean>(false);

    async function loadOptions(
        type: FAMTypes,
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) {
        const items = await searchFAM(inputValue, type, getSignal());
        callback(items);
    }

    const htCableLoadOptions = (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('htcabletagno', inputValue, callback);

    async function addHtCable(value: TypedSelectOption) {
        setLoading(true);
        const newValues = await searchFAM(value.value, 'htcable');

        const dedupe = newValues.filter((v, i, a) => a.findIndex((s) => s.value === v.value) === i);

        if (dedupe) {
            onChange([...(DRCFormAtomApi.readAtomValue().htCables ?? []), ...dedupe]);
        }
        setLoading(false);
    }

    return (
        <div>
            <Section>
                <div>Related HT cables</div>
                <SearchWrapper>
                    <Select
                        loadOptions={htCableLoadOptions}
                        onChange={(
                            _: MultiValue<TypedSelectOption>,
                            actionMeta: ActionMeta<TypedSelectOption>
                        ) => {
                            if (!actionMeta.option) return;
                            addHtCable(actionMeta.option);
                        }}
                        onInputChange={abort}
                        value={htCables}
                    />
                    <LoadingWrapper>
                        {loading ? <Progress.Dots color="primary" /> : null}
                    </LoadingWrapper>
                </SearchWrapper>
                <div>
                    <HtCableTable
                        htCables={
                            htCables
                                .filter(({ type }) => type === 'htcable')
                                .map((s) => s.object) as RcScopeHtTag[]
                        }
                        editMode={true}
                    />
                </div>
            </Section>
        </div>
    );
};
