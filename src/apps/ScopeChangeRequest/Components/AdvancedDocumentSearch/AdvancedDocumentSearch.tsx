import { Fragment, useCallback, useState } from 'react';
import { Button, Icon, Progress, Scrim, SingleSelect, TextField } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { useCancellationToken } from '@equinor/hooks';
import { tokens } from '@equinor/eds-tokens';

import { TypedSelectOption } from '../../api/Search/searchType';
import { Result } from './Results';
import { AdvancedSearch, ModalHeader, Wrapper, Title, SearchField } from './advancedSearch.styles';
import { ReferenceType, useReferencesSearch } from '../../hooks/Search/useReferencesSearch';
import { NotFoundList } from './NotFoundList';
import { fetchBatchCommPkg, fetchBatchTags } from '../../api/PCS/Batch';
import { getBatchPunch } from '../../api/FAM/Batch/getBatchPunch';
import { BatchCheckbox } from './BatchCheckbox';
import styled from 'styled-components';

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

    const setSearchResults = (results: TypedSelectOption[]) => {
        setResults(results);
        setIsLoading(false);
    };

    const [isBatch, setIsBatch] = useState(false);

    const flipBatch = () => {
        setResults([]);
        setIsBatch((s) => !s);
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
        setIsBatch(false);
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

    const resolveBatchPunch = async (punchNos: string[]) => {
        startNewSearch();
        const results = (await getBatchPunch(punchNos, getSignal())).map(
            (s): TypedSelectOption => ({
                label: `${s.punchItemNo} - ${s.description}`,
                object: s,
                searchValue: s.punchItemNo.toString(),
                type: 'punch',
                value: s.punchItemNo.toString(),
            })
        );
        setNotFound(
            punchNos
                .filter((punchNo) => results.findIndex(({ value }) => value === punchNo) === -1)
                .filter((x) => Boolean(x.length))
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

    const getOnChangeForBatch = useCallback((): ((e) => Promise<void>) => {
        if (!referenceIsBatchType) throw `${referenceType} does not support batch`;
        switch (referenceType) {
            case 'tag': {
                return (e) => resolveBatchTags(e.target.value.split('\n'));
            }

            case 'punch': {
                return (e) => resolveBatchPunch(e.target.value.split('\n'));
            }

            case 'commpkg': {
                return (e) => resolveBatchCommPkgs(e.target.value.split('\n'));
            }
        }
    }, [referenceType]);

    const handleReferenceTypeChanged = (change) => {
        abort();
        setSearchText('');
        setIsBatch(false);
        setNotFound([]);
        if (!change.selectedItem) {
            setReferenceType(undefined);
        } else {
            setReferenceType(change.selectedItem as ReferenceType);
        }
        setResults([]);
    };

    const referenceIsBatchType =
        referenceType === 'tag' || referenceType === 'punch' || referenceType === 'commpkg';

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
                                handleSelectedItemChange={handleReferenceTypeChanged}
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
                                <Case when={isBatch}>
                                    {referenceIsBatchType && (
                                        <TextField
                                            multiline
                                            rows={4}
                                            placeholder={`Paste a column from excel here`}
                                            id="batchPunch"
                                            inputIcon={<InputIcon />}
                                            onChange={getOnChangeForBatch()}
                                        />
                                    )}
                                </Case>
                            </Switch>
                        </SearchField>
                        <BatchCheckboxWrapper>
                            {referenceIsBatchType && (
                                <BatchCheckbox flipChecked={flipBatch} isChecked={isBatch} />
                            )}
                        </BatchCheckboxWrapper>

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

const BatchCheckboxWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
`;
