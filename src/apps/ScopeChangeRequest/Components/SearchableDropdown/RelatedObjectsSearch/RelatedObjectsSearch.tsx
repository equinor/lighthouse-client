import { Icon, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import { ProcoSysTypes } from '../../../Types/ProCoSys/ProCoSysTypes';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { StidTypes } from '../../../Types/STID/STIDTypes';
import { useCancellationToken } from '../../../Hooks/useCancellationToken';
import { AdvancedDocumentSearch } from '../../STID';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from '../applyEds';
import { SearchableDropdownWrapper } from '../SearchableDropdownWrapper';
import {
    Column,
    ErrorWrapper,
    Inline,
    SearchContainer,
    SelectContainer,
    Wrapper,
    ListItem,
    Spacer,
    Title,
    TitleBar,
} from './RelatedObjectsStyles';
import { useReferencesSearch } from '../../../Hooks/Search/useReferencesSearch';

interface RelatedObjectsSearchProps {
    relatedObjects: TypedSelectOption[];
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>;
}

export const RelatedObjectsSearch = ({
    relatedObjects,
    setRelatedObjects,
}: RelatedObjectsSearchProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const { abort, getSignal } = useCancellationToken();
    const { search: searchReferences } = useReferencesSearch();

    const referenceTypes: (ProcoSysTypes | StidTypes)[] = [
        'document',
        'discipline',
        'area',
        'commpkg',
        'tag',
        'system',
        'mcpkg',
    ];

    const [referenceType, setReferenceType] = useState<(ProcoSysTypes | StidTypes) | undefined>(
        referenceTypes[0]
    );

    const addRelatedObject = (value: TypedSelectOption) =>
        setRelatedObjects((prev) => [...prev, value]);

    const removeRelatedObject = (value: string) =>
        setRelatedObjects((prev) => prev.filter((x) => x.value !== value));

    const selectedReferences = useMemo(() => {
        return relatedObjects.sort(function (a, b) {
            if (a.type < b.type) {
                return -1;
            }
            if (a.type > b.type) {
                return 1;
            }
            return 0;
        });
    }, [relatedObjects]);

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
            <Column>
                {apiErrors &&
                    apiErrors.length > 0 &&
                    apiErrors.map((name) => {
                        return <ErrorWrapper key={name}>Failed to fetch {name}</ErrorWrapper>;
                    })}
                <TitleBar>
                    <Title>References</Title>

                    <AdvancedDocumentSearch
                        documents={relatedObjects}
                        appendItem={addRelatedObject}
                        removeItem={removeRelatedObject}
                    />
                </TitleBar>
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
                                    value={relatedObjects}
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
                            {selectedReferences.map((selectedReference) => {
                                const TypeIcon = () => getIcon(selectedReference);
                                return (
                                    <ListItem key={selectedReference.value}>
                                        <Inline>
                                            <TypeIcon />
                                            <Spacer />
                                            <span style={{ fontSize: '16px' }}>
                                                {selectedReference.label}
                                            </span>
                                        </Inline>

                                        <Icon
                                            style={{ cursor: 'pointer' }}
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() => {
                                                removeRelatedObject(selectedReference.value);
                                            }}
                                            name="clear"
                                        />
                                    </ListItem>
                                );
                            })}
                        </>
                    )}
                </Column>
            </Column>
        </Wrapper>
    );
};

function getIcon(x: TypedSelectOption): JSX.Element | null {
    switch (x.type) {
        case 'area':
            return <Icon name="pin_drop" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'discipline':
            return <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'document':
            return <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.hex} />;

        case 'tag':
            return <Icon name="tag" color={tokens.colors.interactive.primary__resting.hex} />;

        default:
            return (
                <Icon
                    name="placeholder_icon"
                    color={tokens.colors.interactive.primary__resting.hex}
                />
            );
    }
}
