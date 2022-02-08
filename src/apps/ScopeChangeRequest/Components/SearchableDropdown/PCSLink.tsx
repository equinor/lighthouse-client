import { Icon, SingleSelect } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useMemo, useRef, useState } from 'react';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups, Theme } from 'react-select';
import AsyncSelect from 'react-select/async';
import styled from 'styled-components';
import { ProcoSysTypes, searchPcs } from '../../Api/Search/PCS/searchPcs';
import { TypedSelectOption } from '../../Api/Search/searchType';
import { searchStid, StidTypes } from '../../Api/Search/STID/searchStid';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';

interface RelatedObjectsSearchProps {
    relatedObjects: TypedSelectOption[];
    setRelatedObjects: React.Dispatch<React.SetStateAction<TypedSelectOption[]>>;
}

export const RelatedObjectsSearch = ({
    relatedObjects,
    setRelatedObjects,
}: RelatedObjectsSearchProps): JSX.Element => {
    const [apiErrors, setApiErrors] = useState<string[]>([]);
    const controller = useRef(new AbortController());
    const [referenceType, setReferenceType] = useState<(ProcoSysTypes | StidTypes) | undefined>();

    const addRelatedObject = (value: TypedSelectOption) =>
        setRelatedObjects((prev) => [...prev, value]);

    const removeRelatedObject = (value: string) =>
        setRelatedObjects((prev) => prev.filter((x) => x.value !== value));

    const objects = useMemo(() => {
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
        controller.current.abort();
        controller.current = new AbortController();

        const search = (type: ProcoSysTypes) =>
            searchPcs(inputValue, type, controller.current.signal);

        switch (referenceType) {
            case 'system': {
                const results = await search('system');
                callback(results);
                return;
            }

            case 'area': {
                const results = await search('area');
                callback(results);
                return;
            }

            case 'commpkg': {
                const results = await search('commpkg');
                callback(results);
                return;
            }

            case 'tag': {
                const results = await search('tag');
                callback(results);
                return;
            }

            case 'discipline': {
                const results = await search('discipline');
                callback(results);
                return;
            }

            case 'document': {
                const results = await searchStid(inputValue, 'document', controller.current.signal);
                callback(results);
                return;
            }
        }
    };

    const referenceTypes: (ProcoSysTypes | StidTypes)[] = [
        'document',
        'discipline',
        'area',
        'commpkg',
        'tag',
        'system',
    ];

    return (
        <Wrapper>
            <Column>
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
                        }}
                    >
                        <SelectContainer>
                            <SingleSelect
                                meta="(Required)"
                                label="Reference type"
                                items={referenceTypes}
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
                        </SearchContainer>
                    </div>
                </Inline>

                <Column>
                    {objects && objects.length > 0 && (
                        <>
                            {objects.map((x) => {
                                const TypeIcon = () => getIcon(x);
                                return (
                                    <ListItem key={x.value}>
                                        <Inline>
                                            <TypeIcon />
                                            <Spacer />
                                            <span style={{ fontSize: '16px' }}>{x.label}</span>
                                        </Inline>

                                        <Icon
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() => {
                                                removeRelatedObject(x.value);
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

const ListItem = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    color: ${tokens.colors.interactive.primary__resting.hex};
`;

const Spacer = styled.div`
    margin-right: 0.5em;
`;

function getIcon(x: TypedSelectOption): JSX.Element | null {
    if (x.type === 'area') {
        return <Icon name="pin_drop" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    if (x.type === 'discipline') {
        return <Icon name="school" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    if (x.type === 'tag') {
        return <Icon name="tag" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    if (x.type === 'document') {
        return <Icon name="file_copy" color={tokens.colors.interactive.primary__resting.hex} />;
    }

    return <Icon name="placeholder_icon" color={tokens.colors.interactive.primary__resting.hex} />;
}

const SelectContainer = styled.div`
    flex-basis: 30%;
    border-bottom: none;
`;

const SearchContainer = styled.div`
    flex-basis: 70%;
    border-bottom: none;
`;

const Inline = styled.span`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const Column = styled.div`
    display: flex;
    flex-direction: column;
    margin-top: 0.5em;
`;

const Wrapper = styled.div`
    width: 100%;
`;

const ErrorWrapper = styled.div`
    font-size: 12px;
    color: red;
`;
