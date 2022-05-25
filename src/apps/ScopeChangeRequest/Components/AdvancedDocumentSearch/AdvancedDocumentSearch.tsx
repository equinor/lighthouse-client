import React, { Fragment, useEffect, useState } from 'react';
import { Button, Icon, Progress, Scrim, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../api/Search/searchType';
import { StidTypes } from '../../types/STID/STIDTypes';
import { Result } from './Results';
import { SubResults } from './SubResult';
import { AdvancedSearch, ModalHeader, Wrapper, Title, SearchField } from './advancedSearch.styles';
import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { useReferencesSearch } from '../../hooks/Search/useReferencesSearch';
import { useCancellationToken } from '@equinor/hooks';
import { Switch } from '../../../../components/JSXSwitch/Components/Switch';
import { Case } from '@equinor/JSX-Switch';
import { httpClient } from '../../../../Core/Client/Functions';
import { Tag } from '../../types/ProCoSys/Tag';

interface AdvancedDocumentSearchProps {
    documents: TypedSelectOption[];
    appendItem: (item: TypedSelectOption | TypedSelectOption[]) => void;
    removeItem: (value: string) => void;
}

export interface SubResult {
    tagName: string;
    documents: TypedSelectOption[];
}

export const AdvancedDocumentSearch = ({
    appendItem,
    documents,
    removeItem,
}: AdvancedDocumentSearchProps): JSX.Element => {
    const { search } = useReferencesSearch();

    const [isLoading, setIsLoading] = useState<boolean>(false);
    //controls
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string | undefined>();
    const [results, setResults] = useState<TypedSelectOption[]>([]);
    const [subResults, setSubResults] = useState<SubResult | undefined>();
    const [referenceType, setReferenceType] = useState<(ProcoSysTypes | StidTypes) | undefined>();

    const { abort, getSignal } = useCancellationToken();

    function checkDuplicate(x: TypedSelectOption): boolean {
        return documents.map((x) => x.value).includes(x.value);
    }

    const referenceTypes: (ProcoSysTypes | StidTypes)[] = [
        'document',
        'area',
        'commpkg',
        'tag',
        'system',
        'batchTag',
        // 'stidtag',
    ];

    useEffect(() => {
        if (!searchText || searchText.length === 0) {
            setResults([]);
            setSubResults(undefined);
        }
    }, [searchText]);

    const handleReturnClick = () => setSubResults(undefined);

    async function handleClick(result: TypedSelectOption, action: 'Add' | 'Remove') {
        if (action === 'Add') {
            if (!checkDuplicate(result)) {
                appendItem(result);
                return;
            }
        }
        if (action === 'Remove') {
            if (checkDuplicate(result)) {
                removeItem(result.value);
                return;
            }
        }
    }

    function resetStates() {
        setResults([]);
        setSubResults(undefined);
        setSearchText(undefined);
    }

    const fetchResults = async (inputValue: string) => {
        setIsLoading(true);
        //Aborts previous api call
        abort();
        if (!referenceType) return;

        const data = await search(inputValue, referenceType, getSignal());
        setResults(data);

        setIsLoading(false);
    };

    const resolveBatchTags = async (tagNos: string[]) => {
        setIsLoading(true);
        abort();
        const { procosys } = httpClient();

        const res = await procosys.fetch(
            `api/tag/ByTagNos?plantId=PCS%24JOHAN_CASTBERG&projectName=L.O532C.002&api-version=4.1${tagNos
                .map((x) => `&tagNos=${x}`)
                .toString()
                .replaceAll(',', '')}`
        );

        const data: TypedSelectOption[] = (await res.json()).map(
            (value: Tag): TypedSelectOption => ({
                type: 'tag',
                label: value.TagNo,
                object: value,
                searchValue: value.TagNo,
                value: value.TagNo,
                metadata: value.Description,
            })
        );

        appendItem(data);
        setResults(data);
    };

    return (
        <Fragment>
            <AdvancedSearch
                onClick={() => {
                    setResults([]);
                    setIsOpen((prev) => !prev);
                }}
            >
                <Icon name="search" />
                <div>Advanced search</div>
            </AdvancedSearch>

            {isOpen && (
                <Scrim
                    style={{
                        position: 'fixed',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        textAlign: 'center',
                        height: '100vh',
                        width: '100vw',
                    }}
                >
                    <Wrapper>
                        <ModalHeader>
                            <Title>Add references</Title>
                            <Button
                                variant="ghost_icon"
                                onClick={() => {
                                    resetStates();
                                    setIsOpen(false);
                                }}
                            >
                                <Icon
                                    name="close"
                                    color={tokens.colors.interactive.primary__resting.hex}
                                />
                            </Button>
                        </ModalHeader>
                        <br />

                        <SearchField>
                            <SingleSelect
                                label="Reference type"
                                items={referenceTypes}
                                handleSelectedItemChange={(change) => {
                                    abort();
                                    setSearchText('');
                                    if (!change.selectedItem) {
                                        setReferenceType(undefined);
                                    } else {
                                        setReferenceType(
                                            change.selectedItem as ProcoSysTypes | StidTypes
                                        );
                                    }
                                    setResults([]);
                                }}
                            />

                            <Switch
                                defaultCase={
                                    <TextField
                                        disabled={referenceType === undefined}
                                        id={'Stid document selector'}
                                        value={searchText}
                                        inputIcon={
                                            <>
                                                {isLoading ? (
                                                    <Progress.Dots color="primary" />
                                                ) : (
                                                    <Icon name="search" />
                                                )}
                                            </>
                                        }
                                        placeholder={
                                            referenceType
                                                ? `Type to search ${referenceType}`
                                                : 'Please choose a reference type'
                                        }
                                        onChange={(e) => {
                                            console.log(e.target.value);
                                            setSubResults(undefined);
                                            setSearchText(e.target.value || undefined);
                                            if (e.target.value && e.target.value.length > 0) {
                                                fetchResults(e.target.value);
                                            }
                                        }}
                                    />
                                }
                            >
                                <Case when={!referenceType}>
                                    <TextField
                                        id={'disabled'}
                                        disabled
                                        placeholder="Select a reference type"
                                    />
                                </Case>
                                <Case when={referenceType === 'batchTag'}>
                                    <TextField
                                        multiline
                                        rows={1}
                                        id="batchTags"
                                        onChange={(e) => {
                                            resolveBatchTags(e.target.value.split('\n'));
                                        }}
                                    />
                                </Case>
                            </Switch>
                        </SearchField>

                        {subResults ? (
                            <SubResults
                                subResults={subResults}
                                handleReturnClick={handleReturnClick}
                                handleClick={handleClick}
                            />
                        ) : (
                            <>
                                {results &&
                                    results.map((result) => (
                                        <Result
                                            key={result.value}
                                            handleClick={handleClick}
                                            result={result}
                                            isSelected={checkDuplicate}
                                        />
                                    ))}
                            </>
                        )}

                        <br />
                    </Wrapper>
                </Scrim>
            )}
        </Fragment>
    );
};
