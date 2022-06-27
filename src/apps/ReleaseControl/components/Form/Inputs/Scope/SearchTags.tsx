import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import styled from 'styled-components';
import { useCancellationToken } from '../../../../../../hooks/cancellationToken/useCancellationToken';
import { TypedSelectOption } from '../../../../../ScopeChangeRequest/api/Search/searchType';
import {
    FAMTypes,
    useFAMSearch,
} from '../../../../../ScopeChangeRequest/hooks/Search/useFAMSearch';
import { FamTagType } from '../../../../types/releaseControl';
import { Select } from './ScopeSelect';
import { TagTable } from './TagTable';

interface SearchTagsProps {
    onChange: (newTags: TypedSelectOption[]) => void;
    tags: TypedSelectOption[];
}

export const SearchTags = ({ onChange, tags }: SearchTagsProps): JSX.Element => {
    const { getSignal, abort } = useCancellationToken();

    const { searchFAM } = useFAMSearch();

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
    ) => loadOptions('famtag', inputValue, callback);

    const addTag = (value: TypedSelectOption | TypedSelectOption[]) => {
        const newValues = Array.isArray(value) ? value : [value];
        onChange([...tags, ...newValues]);
    };

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
                </SearchWrapper>
                <div>
                    <TagTable
                        tags={
                            tags
                                .filter(({ type }) => type === 'famtag')
                                .map((s) => s.object) as FamTagType[]
                        }
                    />
                </div>
            </Section>
        </div>
    );
};

const SearchWrapper = styled.div`
    width: 250px;
`;

const Section = styled.div`
    display: flex;
    flex-direction: column;
    gap: 1em;
`;
