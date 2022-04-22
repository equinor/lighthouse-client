import { SingleSelect } from '@equinor/eds-core-react';
import { useMemo, useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../api/Search/searchType';
import { StidTypes } from '../../types/STID/STIDTypes';
import { useCancellationToken } from '../../hooks/cancellationToken/useCancellationToken';
import { AdvancedDocumentSearch } from '../AdvancedDocumentSearch';
import {
    applyEdsComponents,
    applyEdsStyles,
    applyEDSTheme,
} from '../Inputs/SearchableDropdown/applyEds';
import { SearchableDropdownWrapper } from '../Inputs/SearchableDropdown/SearchableDropdownWrapper';
import {
    Column,
    ErrorWrapper,
    Inline,
    SearchContainer,
    SelectContainer,
    Wrapper,
    Title,
    TitleBar,
} from './searchReferences.styles';
import { useReferencesSearch } from '../../hooks/Search/useReferencesSearch';
import { SelectedItem } from './SelectedItem';

interface SearchReferencesProps {
    references: TypedSelectOption[];
    handleReferencesChanged: (references: TypedSelectOption[]) => void;
}

export const SearchReferences = ({
    handleReferencesChanged,
    references,
}: SearchReferencesProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const { abort, getSignal } = useCancellationToken();
    const { search: searchReferences, error } = useReferencesSearch();

    const referenceTypes: (ProcoSysTypes | StidTypes)[] = [
        'document',
        'discipline',
        'area',
        'commpkg',
        'tag',
        'system',
    ];

    const [referenceType, setReferenceType] = useState<(ProcoSysTypes | StidTypes) | undefined>(
        referenceTypes[0]
    );

    const addRelatedObject = (value: TypedSelectOption) =>
        handleReferencesChanged([...references, value]);

    const removeRelatedObject = (value: string) =>
        handleReferencesChanged(references.filter((x) => x.value !== value));

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

                <AdvancedDocumentSearch
                    documents={references}
                    appendItem={addRelatedObject}
                    removeItem={removeRelatedObject}
                />
            </TitleBar>
            <Column>
                {error && <div style={{ color: 'red' }}>{error}</div>}
                {apiErrors &&
                    apiErrors.length > 0 &&
                    apiErrors.map((name) => {
                        return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                    })}
                <Inline>
                    <div
                        style={{
                            width: '-webkit-fill-available',
                            fontSize: '16px',
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'flex-end',
                            margin: '0.2em 0em',
                        }}
                    >
                        <SelectContainer>
                            <SingleSelect
                                meta="(Required)"
                                label="Reference type"
                                items={referenceTypes}
                                value={referenceType}
                                handleSelectedItemChange={(change) => {
                                    if (!change.selectedItem) {
                                        setReferenceType(undefined);
                                    } else {
                                        setReferenceType(
                                            change.selectedItem as ProcoSysTypes | StidTypes
                                        );
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
                                    onInputChange={() => {
                                        setApiErrors([]);
                                    }}
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
                    </div>
                </Inline>

                <Column>
                    {selectedReferences && selectedReferences.length > 0 && (
                        <>
                            {selectedReferences.map((selectedReference) => (
                                <SelectedItem
                                    key={selectedReference.value}
                                    item={selectedReference}
                                    handleRemove={removeRelatedObject}
                                />
                            ))}
                        </>
                    )}
                </Column>
            </Column>
        </Wrapper>
    );
};
