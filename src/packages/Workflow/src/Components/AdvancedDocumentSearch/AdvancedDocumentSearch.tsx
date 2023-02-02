import { Fragment, useState } from 'react';
import { Button, Icon, Progress, Scrim, TextField } from '@equinor/eds-core-react';
import { Case, Switch } from '@equinor/JSX-Switch';
import { tokens } from '@equinor/eds-tokens';

import { Result } from './Results';
import {
    AdvancedSearch,
    ModalHeader,
    Wrapper,
    Title,
    SearchField,
    BatchCheckboxWrapper,
} from './advancedSearch.styles';
import { NotFoundList } from './NotFoundList';
import { BatchCheckbox } from './BatchCheckbox';
import { QueryFunctionContext, useQuery } from 'react-query';
import {
    getBatchPunch,
    proCoSysQueries,
    ReferenceType,
    SingleSelectNoClear,
    TypedSelectOption,
} from '@equinor/Workflow';
import { useFacility } from '@equinor/lighthouse-portal-client';
import { fetchBatchCommPkg, fetchBatchTag } from '../../Api/PCS/Batch';
import { fetchBatchMcPkg } from '../../Api/PCS/Batch/batchMcPkg';
import { fetchBatchDocuments } from '../../Api/PCS/Batch/batchDocuments';
import { Document } from '@equinor/Workflow';
import { System } from '../../Types/ProCoSys/system';
import { useReferencesSearch } from '../../Hooks/Search/useReferencesSearch';

interface AdvancedDocumentSearchProps {
    documents: TypedSelectOption[];
    appendItem: (item: TypedSelectOption | TypedSelectOption[]) => void;
    removeItem: (value: string) => void;
    advancedReferenceTypes: ReferenceType[];
}

export const AdvancedDocumentSearch = ({
    appendItem,
    documents,
    removeItem,
    advancedReferenceTypes,
}: AdvancedDocumentSearchProps): JSX.Element => {
    const { search } = useReferencesSearch();

    //controls
    const [isOpen, setIsOpen] = useState(false);
    const [searchText, setSearchText] = useState<string | undefined>();
    const [referenceType, setReferenceType] = useState<ReferenceType | undefined>(
        advancedReferenceTypes[0]
    );
    const [isBatch, setIsBatch] = useState(false);
    const [notFound, setNotFound] = useState<string[]>([]);

    const { procosysPlantId } = useFacility();
    const { data: systems } = useQuery<unknown, unknown, System[]>(
        proCoSysQueries.getSystemsQuery(procosysPlantId)
    );

    const flipBatch = () => {
        setIsBatch((s) => !s);
    };

    async function getSearchFunction(context: QueryFunctionContext): Promise<TypedSelectOption[]> {
        if (!searchText || !referenceType) return [];
        const { signal } = context;

        if (isBatch) {
            const numbers = searchText.split('\n');
            const results: TypedSelectOption[] = await getResultsFromBatch(
                referenceType,
                numbers,
                systems,
                signal
            );

            setNotFound(
                numbers
                    .filter((punchNo) => results.findIndex(({ value }) => value === punchNo) === -1)
                    .filter((x) => Boolean(x.length))
            );

            appendItem(results);
            return results;
        }

        return await search(searchText, referenceType, signal);
    }

    const { data, isFetching } = useQuery(
        ['references', referenceType, isBatch, searchText],
        getSearchFunction,
        { staleTime: 0, cacheTime: 0 }
    );

    function checkDuplicate(x: TypedSelectOption): boolean {
        return documents.map((x) => x.value).includes(x.value);
    }

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
        setSearchText(undefined);
        setNotFound([]);
        setIsBatch(false);
    }

    const InputIcon = () => (
        <Switch>
            <Case when={isFetching}>
                <Progress.Dots color="primary" />
            </Case>
            <Case when={!isFetching}>
                <Icon name="search" />
            </Case>
        </Switch>
    );

    const handleReferenceTypeChanged = (change) => {
        setSearchText('');
        setIsBatch(false);
        setNotFound([]);
        if (!change.selectedItem) {
            setReferenceType(undefined);
        } else {
            setReferenceType(change.selectedItem as ReferenceType);
        }
    };

    const referenceIsBatchType =
        referenceType === 'tag' ||
        referenceType === 'punch' ||
        referenceType === 'commpkg' ||
        referenceType === 'system' ||
        referenceType === 'document' ||
        referenceType === 'mcpkg';

    function getPlaceholderText() {
        switch (true) {
            case referenceType && isBatch: {
                return `Paste a column from excel here`;
            }

            case Boolean(referenceType): {
                return `Type to search ${referenceType}`;
            }

            case !referenceType: {
                return 'Please choose a reference type';
            }
        }
    }

    return (
        <Fragment>
            <AdvancedSearch
                onClick={() => {
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
                            <SingleSelectNoClear
                                label="Reference type"
                                items={advancedReferenceTypes}
                                value={referenceType}
                                handleSelectedItemChange={handleReferenceTypeChanged}
                            />

                            <TextField
                                disabled={!referenceType}
                                id={'SearchField'}
                                multiline={isBatch}
                                rows={4}
                                value={searchText}
                                inputIcon={<InputIcon />}
                                placeholder={getPlaceholderText()}
                                onChange={(e) => {
                                    setSearchText(e.target.value || undefined);
                                }}
                            />
                        </SearchField>
                        <BatchCheckboxWrapper>
                            {referenceIsBatchType && (
                                <BatchCheckbox flipChecked={flipBatch} isChecked={isBatch} />
                            )}
                        </BatchCheckboxWrapper>

                        <NotFoundList notFound={notFound} type={referenceType} />

                        <>
                            {data &&
                                data.map((result) => (
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

async function getResultsFromBatch(
    referenceType: ReferenceType,
    numbers: string[],
    systems: System[] | undefined,
    signal?: AbortSignal
) {
    switch (referenceType) {
        case 'punch': {
            return await getBatchPunch(numbers, signal);
        }

        case 'tag': {
            return await fetchBatchTag(numbers, signal);
        }

        case 'commpkg': {
            return await fetchBatchCommPkg(numbers, signal);
        }

        case 'mcpkg': {
            return await fetchBatchMcPkg(numbers, signal);
        }

        case 'document': {
            const documents = await fetchBatchDocuments(numbers, signal);
            //We have to filter out only the OF-P documents if there are two documents with same docNo
            const uniqueDocs = documents.reduce((unique: TypedSelectOption[], o) => {
                {
                    if (
                        documents.some(
                            (x) =>
                                (x.object as Document).docNo === (o.object as Document).docNo &&
                                (o.object as Document).revStatus === 'OF-P'
                        ) ||
                        documents.filter(
                            (x) => (x.object as Document).docNo === (o.object as Document).docNo
                        ).length <= 1
                    ) {
                        unique.push(o);
                    }
                }
                return unique;
            }, []);

            return uniqueDocs;
        }

        case 'system': {
            if (!systems) return [];

            return systems
                .filter((s) => numbers.includes(s.Code))
                .map(
                    (s): TypedSelectOption => ({
                        label: `${s.Code} - ${s.Description}`,
                        object: s,
                        searchValue: s.Code,
                        type: 'system',
                        value: s.Code,
                    })
                );
        }

        default:
            return [];
    }
}
