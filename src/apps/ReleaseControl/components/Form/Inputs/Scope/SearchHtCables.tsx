import { FAMTypes, TypedSelectOption, useCompletionSearch } from '@equinor/Workflow';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { Select } from './ScopeSelect';
import { SearchWrapper, Section } from './search.styles';
import { RcScopeHtTag } from '../../../../types/releaseControl';
import { useState } from 'react';
import { HtCableTable } from './HtCableTable';

interface SearchHtCablesProps {
    onChange: (newHtCables: TypedSelectOption[]) => void;
    htCables: TypedSelectOption[];
}

export const SearchHtCables = ({ onChange, htCables }: SearchHtCablesProps): JSX.Element => {
    const { getSignal, abort } = useCancellationToken();
    const { searchFAM } = useCompletionSearch();
    const [timer, setTimer] = useState<NodeJS.Timeout>();

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

    const htCableLoadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        if (inputValue.trim().length >= 3)
            return await loadOptions('htcabletagno', inputValue, callback);
        return callback([
            {
                label: 'Need at least three chars',
                value: '',
                type: 'htcabletagno',
                searchValue: '',
                object: null,
            },
        ]);
    };

    function addHtCable(value: TypedSelectOption) {
        onChange([...(DRCFormAtomApi.readAtomValue().htCables ?? []), value]);
    }

    return (
        <div>
            <Section>
                <div>Related HT cables</div>
                <SearchWrapper>
                    <Select
                        loadOptions={(val, cb) => {
                            if (timer) {
                                clearTimeout(timer);
                            }
                            const newTimer = setTimeout(
                                () => htCableLoadOptions(val.trim(), cb),
                                500
                            );
                            setTimer(newTimer);
                        }}
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
