import React, { Fragment, useEffect, useReducer, useState } from 'react';
import { Button, Icon, Progress, Scrim, SingleSelect, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { searchStid, StidTypes } from '../../../Api/Search/STID/searchStid';
import { useHttpClient } from '../../../../../Core/Client/Hooks/useApiClient';
import { getDocumentsByTag } from '../../../Api/STID/getDocumentsByTag';
import { Result } from './Results';
import { SubResults } from './SubResult';
import { AdvancedSearch, StidHeader, StidWrapper, Title } from './stidSelectorStyles';
import { useCancellationToken } from '../../../Hooks/useCancellationToken';
import { ProcoSysTypes, searchPcs } from '../../../Api/Search/PCS';

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

    const [
        { addDuplicate, documentsLoading, tagsLoading, hasErrored, tagContainsNoDocuments },
        dispatch,
    ] = useReducer(tasksReducer, initial);

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
            dispatch({ type: 'setTagContainsNoDocuments', value: true });
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
        dispatch({ type: 'reset', value: true });
    }

    const fetchResults = async (inputValue: string) => {
        //Aborts previous api call
        abort();
        switch (referenceType) {
            case 'commpkg': {
                const commPkgs = await searchPcs(inputValue, 'commpkg', getSignal());
                setResults(commPkgs);
                break;
            }

            case 'system': {
                const commPkgs = await searchPcs(inputValue, 'system', getSignal());
                setResults(commPkgs);
                break;
            }

            case 'tag': {
                const commPkgs = await searchPcs(inputValue, 'tag', getSignal());
                setResults(commPkgs);
                break;
            }

            case 'discipline': {
                const commPkgs = await searchPcs(inputValue, 'discipline', getSignal());
                setResults(commPkgs);
                break;
            }

            case 'area': {
                const commPkgs = await searchPcs(inputValue, 'area', getSignal());
                setResults(commPkgs);
                break;
            }

            case 'stidtag': {
                const tagsResult = await searchStid(inputValue, 'stidtag', getSignal());
                setResults(tagsResult);
                break;
            }

            case 'document': {
                const documentsResult = await searchStid(inputValue, 'document', getSignal());
                setResults(documentsResult);
                break;
            }
        }
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
                        minHeight: '100vh',
                        width: '100vw',
                    }}
                >
                    <StidWrapper>
                        <StidHeader>
                            <Title>Add document</Title>
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
                        </StidHeader>
                        <br />

                        <div style={{ display: 'flex', alignItems: 'flex-end', gap: '1em' }}>
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
                                    setResults([]);
                                }}
                            />

                            <TextField
                                id={'Stid document selector'}
                                value={searchText}
                                inputIcon={
                                    <>
                                        {documentsLoading || tagsLoading ? (
                                            <Progress.Dots color="primary" />
                                        ) : (
                                            <Icon name="search" />
                                        )}
                                    </>
                                }
                                placeholder={'Type to search tag / document'}
                                onChange={(e) => {
                                    setSubResults(undefined);
                                    setSearchText(e.target.value || undefined);
                                    if (e.target.value && e.target.value.length > 0) {
                                        fetchResults(e.target.value);
                                    }
                                }}
                            />
                        </div>
                        <div style={{ height: '12px' }}>
                            {tagContainsNoDocuments && (
                                <div style={{ color: 'red' }}>This tag contains no documents</div>
                            )}
                            {addDuplicate && (
                                <div style={{ color: 'red' }}>
                                    This document has already been added
                                </div>
                            )}
                            {(tagsLoading || documentsLoading) && (
                                <div>
                                    {tagsLoading && <div>Searching tags</div>}
                                    {documentsLoading && <div>Searching documents</div>}
                                </div>
                            )}
                            {hasErrored && <div>Stid call failed</div>}
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
                    </StidWrapper>
                </Scrim>
            )}
        </Fragment>
    );
};

const initial: NotifyEvents = {
    addDuplicate: false,
    documentsLoading: false,
    hasErrored: false,
    tagContainsNoDocuments: false,
    tagsLoading: false,
};

interface NotifyEvents {
    tagContainsNoDocuments: boolean;
    tagsLoading: boolean;
    documentsLoading: boolean;
    hasErrored: boolean;
    addDuplicate: boolean;
}

type MutableStates =
    | 'setAddDuplicate'
    | 'setDocumentsLoading'
    | 'setHasErrored'
    | 'setTagContainsNoDocuments'
    | 'setTagsLoading'
    | 'reset';

interface Actions {
    type: MutableStates;
    value: boolean;
}

function tasksReducer(state: NotifyEvents, action: Actions): NotifyEvents {
    switch (action.type) {
        case 'setAddDuplicate': {
            return { ...state, addDuplicate: action.value };
        }

        case 'setDocumentsLoading': {
            return { ...state, documentsLoading: action.value };
        }

        case 'setHasErrored': {
            return { ...state, hasErrored: action.value };
        }

        case 'setTagContainsNoDocuments': {
            return { ...state, tagContainsNoDocuments: action.value };
        }

        case 'setTagsLoading': {
            return { ...state, tagsLoading: action.value };
        }

        case 'reset': {
            return initial;
        }

        default: {
            throw Error('Unknown action: ' + action.type);
        }
    }
}
