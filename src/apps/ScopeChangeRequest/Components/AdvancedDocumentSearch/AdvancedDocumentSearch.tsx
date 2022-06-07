import { Fragment, useState } from 'react';
import {
    Button,
    Checkbox,
    Icon,
    Progress,
    Scrim,
    SingleSelect,
    TextField,
    Tooltip,
} from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { useCancellationToken } from '@equinor/hooks';
import { tokens } from '@equinor/eds-tokens';
import styled from 'styled-components';

import { TypedSelectOption } from '../../api/Search/searchType';
import { Result } from './Results';
import { AdvancedSearch, ModalHeader, Wrapper, Title, SearchField } from './advancedSearch.styles';
import { ReferenceType, useReferencesSearch } from '../../hooks/Search/useReferencesSearch';
import { NotFoundList } from './NotFoundList';
import { fetchBatchCommPkg, fetchBatchTags } from '../../api/PCS/Batch';

interface AdvancedDocumentSearchProps {
    documents: TypedSelectOption[];
    appendItem: (item: TypedSelectOption | TypedSelectOption[]) => void;
    removeItem: (value: string) => void;
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

    const [referenceType, setReferenceType] = useState<ReferenceType | undefined>('tag');

    const setSearchResults = (results) => {
        setResults(results);
        setIsLoading(false);
    };

    const [isBatchTag, setIsBatchTag] = useState(false);
    const [isBatchCommPkg, setIsBatchCommPkg] = useState(false);
    const flipBatchCommPkg = () => {
        setResults([]);
        setIsBatchCommPkg((s) => !s);
    };
    const flipBatchTag = () => {
        setResults([]);
        setIsBatchTag((s) => !s);
    };

    const [notFound, setNotFound] = useState<string[]>([]);

    const { abort, getSignal } = useCancellationToken();

    function checkDuplicate(x: TypedSelectOption): boolean {
        return documents.map((x) => x.value).includes(x.value);
    }

    const referenceTypes: ReferenceType[] = [
        'document',
        'area',
        'commpkg',
        'tag',
        'system',
        'punch',
        // 'stidtag',
    ];

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
        setSearchText(undefined);
        setNotFound([]);
    }

    const startNewSearch = () => {
        setIsLoading(true);
        abort();
        setNotFound([]);
    };

    const fetchResults = async (inputValue: string) => {
        startNewSearch();
        if (!referenceType) return;

        const data = await search(inputValue, referenceType, getSignal());
        setSearchResults(data);
    };

    const resolveBatchTags = async (tagNos: string[]) => {
        startNewSearch();
        const results = await fetchBatchTags(tagNos, getSignal());
        setNotFound(
            tagNos
                .filter((s) => !results.map((s) => s.value).includes(s))
                .filter((s) => Boolean(s.length))
        );
        appendItem(results);
        setSearchResults(results);
    };

    const resolveBatchCommPkgs = async (commPkgNo: string[]) => {
        startNewSearch();
        const results = await fetchBatchCommPkg(commPkgNo, getSignal());
        setNotFound(
            commPkgNo
                .filter((s) => !results.map((s) => s.value).includes(s))
                .filter((s) => Boolean(s.length))
        );
        appendItem(results);
        setSearchResults(results);
    };

    const InputIcon = () => (
        <Switch>
            <Case when={isLoading}>
                <Progress.Dots color="primary" />
            </Case>
            <Case when={!isLoading}>
                <Icon name="search" />
            </Case>
        </Switch>
    );

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
                                value={referenceType}
                                handleSelectedItemChange={(change) => {
                                    abort();
                                    setSearchText('');
                                    if (!change.selectedItem) {
                                        setReferenceType(undefined);
                                    } else {
                                        setReferenceType(change.selectedItem as ReferenceType);
                                    }
                                    setResults([]);
                                }}
                            />
                            <Switch
                                defaultCase={
                                    <TextField
                                        id={'Stid document selector'}
                                        value={searchText}
                                        inputIcon={<InputIcon />}
                                        placeholder={
                                            referenceType
                                                ? `Type to search ${referenceType}`
                                                : 'Please choose a reference type'
                                        }
                                        onChange={(e) => {
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
                                <Case when={referenceType === 'tag' && isBatchTag}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        id="batchTags"
                                        placeholder={`Paste a column from excel here`}
                                        inputIcon={<InputIcon />}
                                        onChange={(e) => {
                                            resolveBatchTags(e.target.value.split('\n'));
                                        }}
                                    />
                                </Case>

                                <Case when={referenceType === 'commpkg' && isBatchCommPkg}>
                                    <TextField
                                        multiline
                                        rows={4}
                                        placeholder={`Paste a column from excel here`}
                                        id="batchComm"
                                        inputIcon={<InputIcon />}
                                        onChange={(e) => {
                                            resolveBatchCommPkgs(e.target.value.split('\n'));
                                        }}
                                    />
                                </Case>
                            </Switch>
                        </SearchField>
                        <div style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <BatchCheckboxes
                                flipBatchCommPkg={flipBatchCommPkg}
                                flipBatchTag={flipBatchTag}
                                isBatchCommPkg={isBatchCommPkg}
                                isBatchTag={isBatchTag}
                                referenceType={referenceType}
                            />
                        </div>

                        <NotFoundList notFound={notFound} type={referenceType} />

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

                        <br />
                    </Wrapper>
                </Scrim>
            )}
        </Fragment>
    );
};

interface BatchCheckboxesProps {
    referenceType: ReferenceType | undefined;
    isBatchTag: boolean;
    flipBatchTag: () => void;
    isBatchCommPkg: boolean;
    flipBatchCommPkg: () => void;
}

const BatchCheckboxes = ({
    flipBatchCommPkg,
    flipBatchTag,
    isBatchCommPkg,
    isBatchTag,
    referenceType,
}: BatchCheckboxesProps) => {
    return (
        <Tooltip title="Gives you a bigger search field and lets you paste a list">
            <CheckboxWrapper>
                {referenceType === 'tag' && (
                    <div>
                        <Checkbox checked={isBatchTag} onChange={flipBatchTag} />
                        Batch search
                    </div>
                )}
                {referenceType === 'commpkg' && (
                    <div>
                        <Checkbox checked={isBatchCommPkg} onChange={flipBatchCommPkg} />
                        Batch search
                    </div>
                )}
            </CheckboxWrapper>
        </Tooltip>
    );
};

const CheckboxWrapper = styled.div`
    display: flex;
    align-items: center;
`;
