import React, { Fragment, useEffect, useState } from 'react';
import { Button, Icon, Scrim, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../../Api/Search/searchType';
import { searchStid } from '../../../Api/Search/STID/searchStid';
import { useApiClient } from '../../../../../Core/Client/Hooks/useApiClient';
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
    const { customApi } = useApiClient('b827c278-12de-47a0-b789-c8d11e3b9571/.default');

    //controls
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string | undefined>();
    const [results, setResults] = useState<TypedSelectOption[]>([]);
    const [subResults, setSubResults] = useState<SubResult | undefined>();

    //status
    const [tagContainsNoDocuments, setTagContainsNoDocuments] = useState<boolean>(false);
    const [tagsLoading, setTagsLoading] = useState<boolean>(false);
    const [documentsLoading, setDocumentsLoading] = useState<boolean>(false);
    const [hasErrored, setHasErrored] = useState(false);
    const [addDuplicate, setAddDuplicate] = useState(false);

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
        setAddDuplicate(false);
        setTagContainsNoDocuments(false);
        if (x.type === 'document') {
            const selectedDocument = x.object as Document;
            //Prevent duplicates
            if (!documents.map((x) => x.docNo).includes(selectedDocument.docNo)) {
                appendDocuments([selectedDocument]);
            } else {
                setAddDuplicate(true);
            }
            popResult(x.value);
        } else {
            const documents = await getDocumentsByTag('JCA', x.value, customApi);
            if (documents.length === 0) {
                setTagContainsNoDocuments(true);
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
        setTagContainsNoDocuments(false);
        setDocumentsLoading(false);
        setTagsLoading(false);
        setResults([]);
        setSubResults(undefined);
        setSearchText(undefined);
        setAddDuplicate(false);
    }

    const fetchResults = async (inputValue: string) => {
        setResults([]);
        setDocumentsLoading(true);
        setTagsLoading(true);
        setHasErrored(false);
        setTagContainsNoDocuments(false);
        let tagsResult: TypedSelectOption[] = [];
        let documentsResult: TypedSelectOption[] = [];
        try {
            tagsResult = await searchStid(inputValue, 'stidtag', customApi);
            setTagsLoading(false);
        } catch (e) {
            setHasErrored(true);
        }
        try {
            documentsResult = await searchStid(inputValue, 'document', customApi);
            setDocumentsLoading(false);
        } catch (e) {
            setHasErrored(true);
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
