import { SingleSelect } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';

import { TypedSelectOption } from '../../api/Search/searchType';
import { useCancellationToken } from '../../../../hooks/cancellationToken/useCancellationToken';
import { AdvancedDocumentSearch } from '../AdvancedDocumentSearch';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../Inputs/SearchableDropdown/applyEds';
import { SearchableDropdownWrapper } from '../Inputs/SearchableDropdown/SearchableDropdownWrapper';
import {
    Column,
    Inline,
    SearchContainer,
    SelectContainer,
    Wrapper,
    Title,
    TitleBar,
    SearchLineWrapper,
} from './searchReferences.styles';
import { ReferenceType, useReferencesSearch } from '../../hooks/Search/useReferencesSearch';
import { SelectedReference } from './SelectedReference';

interface SearchReferencesOptions {
    referenceTypes?: ReferenceType[];
    referenceTypesAdvanced?: ReferenceType[];
}

interface SearchReferencesProps {
    onChange: (newOptions: TypedSelectOption[]) => void;
    references: TypedSelectOption[];
    options?: SearchReferencesOptions;
}

const DEFAULT_REFERENCE_TYPES: ReferenceType[] = [
    'document',
    'area',
    'commpkg',
    'tag',
    'system',
    'punch',
];

export const SearchReferences = ({
    onChange,
    references,
    options,
}: SearchReferencesProps): JSX.Element => {
    const { abort, getSignal } = useCancellationToken();
    const { search: searchReferences } = useReferencesSearch();

    const referenceTypes: ReferenceType[] = options?.referenceTypes ?? DEFAULT_REFERENCE_TYPES;
    const advancedSearchReferenceTypes = options?.referenceTypesAdvanced ?? referenceTypes;

    const [referenceType, setReferenceType] = useState<ReferenceType | undefined>(
        referenceTypes[0]
    );

    const addRelatedObject = (value: TypedSelectOption | TypedSelectOption[]) => {
        const newValues = Array.isArray(value) ? value : [value];
        onChange([...references, ...newValues]);
    };

    const removeRelatedObject = (value: string) =>
        onChange(references.filter((x) => x.value !== value));

    const selectedReferences = useMemo(() => {
        return references.sort((a, b) => a.type.localeCompare(b.type));
    }, [references]);

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        abort();
        if (!referenceType) return;

        const results = await searchReferences(inputValue, referenceType, getSignal());
        callback(results);
    };

    return (
        <Wrapper>
            <TitleBar>
                <Title>References</Title>

                {advancedSearchReferenceTypes.length > 0 && (
                    <AdvancedDocumentSearch
                        documents={references}
                        appendItem={addRelatedObject}
                        removeItem={removeRelatedObject}
                        advancedReferenceTypes={advancedSearchReferenceTypes}
                    />
                )}
            </TitleBar>
            <Column>
                <Inline>
                    <SearchLineWrapper>
                        <SelectContainer>
                            <SingleSelect
                                label="Reference type"
                                items={referenceTypes}
                                value={referenceType}
                                handleSelectedItemChange={(change) => {
                                    if (!change.selectedItem) {
                                        setReferenceType(undefined);
                                    } else {
                                        setReferenceType(change.selectedItem as ReferenceType);
                                    }
                                }}
                            />
                        </SelectContainer>
                        <div style={{ flexBasis: '2%' }} />
                        <SearchContainer>
                            <SearchableDropdownWrapper>
                                <AsyncSelect
                                    isDisabled={!referenceType}
                                    cacheOptions={false}
                                    loadOptions={loadOptions}
                                    defaultOptions={false}
                                    components={applyEdsComponents()}
                                    isMulti={true}
                                    placeholder={`Type to search..`}
                                    isClearable={false}
                                    value={references}
                                    styles={applyEdsStyles()}
                                    controlShouldRenderValue={false}
                                    onChange={(
                                        newValue: MultiValue<TypedSelectOption>,
                                        actionMeta: ActionMeta<TypedSelectOption>
                                    ) => {
                                        if (!actionMeta.option) return;
                                        addRelatedObject(actionMeta.option);
                                    }}
                                    theme={(theme: Theme) => applyEDSTheme(theme)}
                                />
                            </SearchableDropdownWrapper>
                            <div style={{ height: '0.11em' }} />
                        </SearchContainer>
                    </SearchLineWrapper>
                </Inline>

                <Column>
                    {selectedReferences && selectedReferences.length > 0 && (
                        <>
                            {selectedReferences.map((selectedReference) => (
                                <SelectedReference
                                    removeRelatedObject={removeRelatedObject}
                                    selected={selectedReference}
                                    key={selectedReference.value}
                                />
                            ))}
                        </>
                    )}
                </Column>
            </Column>
        </Wrapper>
    );
};
