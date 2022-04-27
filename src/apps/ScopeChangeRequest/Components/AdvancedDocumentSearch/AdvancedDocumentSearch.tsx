import React, { Fragment, useEffect, useState } from 'react';
import { Button, Icon, Progress, Scrim, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../api/Search/searchType';
import { StidTypes } from '../../types/STID/STIDTypes';
import { useHttpClient } from '../../../../Core/Client/Hooks/useApiClient';
import { getDocumentsByTag } from '../../api/STID/getDocumentsByTag';
import { Result } from './Results';
import { SubResults } from './SubResult';
import { AdvancedSearch, ModalHeader, Wrapper, Title } from './advancedSearch.styles';
import { useCancellationToken } from '../../hooks/cancellationToken/useCancellationToken';
import { ProcoSysTypes } from '../../types/ProCoSys/ProCoSysTypes';
import { useReferencesSearch } from '../../hooks/Search/useReferencesSearch';

interface AdvancedDocumentSearchProps {
    documents: TypedSelectOption[];
    appendItem: (item: TypedSelectOption) => void;
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
    const { STID } = useHttpClient();

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

    const popResult = (value: string) => {
        setResults((prev) => prev.filter((x) => x.value !== value));
        if (subResults) {
            setSubResults((prev) => {
                return {
                    documents: prev?.documents.filter((x) => x.value !== value) || [],
                    tagName: prev?.tagName || '',
                };
            });
        }
    };

    const referenceTypes: (ProcoSysTypes | StidTypes)[] = [
        'document',
        'discipline',
        'area',
        'commpkg',
        'tag',
        'system',
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
        if (result.type === 'stidtag') {
            await handleStidTagSelected(result);
            return;
        }

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

    async function handleStidTagSelected(item: TypedSelectOption) {
        const documents = await getDocumentsByTag('JCA', item.value, STID);
        if (documents.length === 0) {
            popResult(item.value);
        } else {
            setSubResults({
                tagName: item.label,
                documents: documents.map((x) => {
                    return {
                        label: `DOC_${x.docNo}`,
                        searchValue: x.docNo,
                        object: x,
                        type: 'document',
                        value: x.docNo,
                    };
                }),
            });
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

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1em' }}>
                            <SingleSelect
                                meta="(Required)"
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
                                    setSubResults(undefined);
                                    setSearchText(e.target.value || undefined);
                                    if (e.target.value && e.target.value.length > 0) {
                                        fetchResults(e.target.value);
                                    }
                                }}
                            />
                        </div>

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
