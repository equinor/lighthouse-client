import { Progress } from '@equinor/eds-core-react';
import { FAMTypes, TypedSelectOption, useFAMSearch } from '@equinor/Workflow';
import { useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { DRCFormAtomApi } from '../../../../Atoms/formAtomApi';
import { Select } from './ScopeSelect';
import { LoadingWrapper, SearchWrapper, Section } from './search.styles';
import { TagTable } from './TagTable';
import { RcScopeTag } from '../../../../types/releaseControl';

interface SearchTagsProps {
    onChange: (newTags: TypedSelectOption[]) => void;
    tags: TypedSelectOption[];
}

export const SearchTags = ({ onChange, tags }: SearchTagsProps): JSX.Element => {
    const { searchFAM } = useFAMSearch();
    const { getSignal, abort } = useCancellationToken();

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

    const tagLoadOptions = (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => loadOptions('famtagno', inputValue, callback);

    async function addTag(value: TypedSelectOption) {
        setLoading(true);
        const newValues = await searchFAM(value.value, 'famtag');

        const dedupe = newValues.filter((v, i, a) => a.findIndex((s) => s.value === v.value) === i);

        if (dedupe) {
            onChange([...(DRCFormAtomApi.readAtomValue().tags ?? []), ...dedupe]);
        }
        setLoading(false);
    }

    console.log(tags);
    return (
        <div>
            <Section>
                <div>Tag involved in this release control</div>
                <SearchWrapper>
                    <Select
                        loadOptions={tagLoadOptions}
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
                    <LoadingWrapper>
                        {loading ? <Progress.Dots color="primary" /> : null}
                    </LoadingWrapper>
                </SearchWrapper>
                <div>
                    <TagTable
                        tags={
                            tags
                                .filter(({ type }) => type === 'famtag')
                                .map((s) => s.object) as RcScopeTag[]
                        }
                        editMode={true}
                    />
                </div>
            </Section>
        </div>
    );
};
