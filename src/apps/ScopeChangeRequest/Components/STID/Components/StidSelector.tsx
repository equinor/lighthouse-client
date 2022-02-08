import React, { Fragment, useEffect, useReducer, useRef, useState } from 'react';
import { Button, Icon, Progress, Scrim, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { searchStid } from '../../../Api/Search/STID/searchStid';
import { useHttpClient } from '../../../../../Core/Client/Hooks/useApiClient';
import { Document } from '../../../Api/STID/Types/Document';
import { getDocumentsByTag } from '../../../Api/STID/getDocumentsByTag';
import { sort } from '../../SearchableDropdown/sort';
import { Results } from './Results';
import { SubResults } from './SubResult';
import { AdvancedSearch, StidHeader, StidWrapper, Title } from './stidSelectorStyles';

interface StidSelectorProps {
    documents: Document[];
    appendDocuments: (documents: Document[]) => void;
}

export interface SubResult {
    tagName: string;
    documents: TypedSelectOption[];
}

export const StidSelector = ({ appendDocuments, documents }: StidSelectorProps): JSX.Element => {
    const { STID } = useHttpClient();

    //controls
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string | undefined>();
    const [results, setResults] = useState<TypedSelectOption[]>([]);
    const [subResults, setSubResults] = useState<SubResult | undefined>();

    const controller = useRef(new AbortController());

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

    useEffect(() => {
        if (!searchText || searchText.length === 0) {
            setResults([]);
            setSubResults(undefined);
        }
    }, [searchText]);

    const handleReturnClick = () => setSubResults(undefined);

    const handleClick = async (x: TypedSelectOption) => {
        dispatch({ type: 'setAddDuplicate', value: false });
        dispatch({ type: 'setTagContainsNoDocuments', value: false });
        if (x.type === 'document') {
            const selectedDocument = x.object as Document;
            //Prevent duplicates
            if (!documents.map((x) => x.docNo).includes(selectedDocument.docNo)) {
                appendDocuments([selectedDocument]);
            } else {
                dispatch({ type: 'setAddDuplicate', value: true });
            }
            popResult(x.value);
        } else {
            const documents = await getDocumentsByTag('JCA', x.value, STID);
            if (documents.length === 0) {
                dispatch({ type: 'setTagContainsNoDocuments', value: true });
                popResult(x.value);
            } else {
                setSubResults({
                    tagName: x.label,
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
    };

    function resetStates() {
        setResults([]);
        setSubResults(undefined);
        setSearchText(undefined);
        dispatch({ type: 'reset', value: true });
    }

    const fetchResults = async (inputValue: string) => {
        controller.current.abort();
        controller.current = new AbortController();
        setResults([]);
        dispatch({ type: 'setDocumentsLoading', value: true });
        dispatch({ type: 'setTagsLoading', value: true });
        dispatch({ type: 'setHasErrored', value: false });
        dispatch({ type: 'setTagContainsNoDocuments', value: false });

        let tagsResult: TypedSelectOption[] = [];
        let documentsResult: TypedSelectOption[] = [];
        try {
            tagsResult = await searchStid(inputValue, 'stidtag', controller.current.signal);
            dispatch({ type: 'setTagsLoading', value: false });
        } catch (e) {
            dispatch({ type: 'setHasErrored', value: true });
        }
        try {
            documentsResult = await searchStid(inputValue, 'document', controller.current.signal);
            dispatch({ type: 'setDocumentsLoading', value: false });
        } catch (e) {
            dispatch({ type: 'setHasErrored', value: true });
        }
        const combined = [...documentsResult, ...tagsResult];
        setResults(combined.sort((a, b) => sort(a, b, inputValue)));
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
                            <Results results={results} handleClick={handleClick} />
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
