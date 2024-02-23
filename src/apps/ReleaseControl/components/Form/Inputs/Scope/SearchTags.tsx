import { FAMTypes, TypedSelectOption, useCompletionSearch } from '@equinor/Workflow';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { Select } from './ScopeSelect';
import { SearchWrapper, Section } from './search.styles';
import { RcScopeTag } from '../../../../types/releaseControl';
import { CreateRcTagTable } from './CreateRcTagTable';
import { useState } from 'react';

interface SearchTagsProps {
    onChange: (newTags: TypedSelectOption[]) => void;
    tags: TypedSelectOption[];
}

export const SearchTags = ({ onChange, tags }: SearchTagsProps): JSX.Element => {
    const { searchFAM } = useCompletionSearch();
    const { getSignal, abort } = useCancellationToken();
    const [timer, setTimer] = useState<any>(null);

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

    const tagLoadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        if (inputValue.trim().length >= 3)
            return await loadOptions('famtagno', inputValue, callback);
        return callback([
            {
                label: 'Need at least three chars',
                value: '',
                type: 'famtagno',
                searchValue: '',
                object: null,
            },
        ]);
    };

    function addTag(value: TypedSelectOption) {
        onChange([...(DRCFormAtomApi.readAtomValue().tags ?? []), value]);
    }

    return (
        <div>
            <Section>
                <div>Tag involved in this release control</div>
                <SearchWrapper>
                    <Select
                        loadOptions={(val, cb) => {
                            if (timer) {
                                clearTimeout(timer);
                            }
                            const newTimer = setTimeout(() => tagLoadOptions(val, cb), 500);
                            setTimer(newTimer);
                        }}
                        onChange={(
                            _: MultiValue<TypedSelectOption>,
                            actionMeta: ActionMeta<TypedSelectOption>
                        ) => {
                            if (!actionMeta.option) return;
                            addTag(actionMeta.option);
                        }}
                        onInputChange={abort}
                        value={tags}
                    />
                </SearchWrapper>
                <div>
                    <CreateRcTagTable
                        tags={
                            tags
                                .filter(({ type }) => type === 'scopetag' || type === 'famtag')
                                .map((s) => s.object) as RcScopeTag[]
                        }
                        editMode={true}
                    />
                </div>
            </Section>
        </div>
    );
};
