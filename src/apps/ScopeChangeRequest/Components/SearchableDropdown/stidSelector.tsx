import React, { Fragment, useState } from 'react';
import { Button, Icon, Scrim } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { TypedSelectOption } from '../../Api/Search/searchType';
import AsyncSelect from 'react-select/async';
import { ActionMeta, GroupBase, MultiValue, OptionsOrGroups } from 'react-select';
import { searchStid } from '../../Api/Search/STID/searchStid';
import { useApiClient } from '../../../../Core/Client/Hooks/useApiClient';
import { applyEdsComponents, applyEdsStyles, applyEDSTheme } from './applyEds';
import styled from 'styled-components';
import { Document } from '../../Api/STID/Types/Document';
import { StidDocument } from '../StidDocument';
import { getDocumentsByTag } from '../../Api/STID/getDocumentsByTag';
import { sort } from './sort';

interface StidSelectorProps {
    appendDocuments: (documents: Document[]) => void;
}

export const StidSelector = ({ appendDocuments }: StidSelectorProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [documents, setDocuments] = useState<TypedSelectOption[]>([]);
    const [tagContainsNoDocuments, setTagContainsNoDocuments] = useState<boolean>(false);
    //prod
    const { customApi } = useApiClient('1734406c-3449-4192-a50d-7c3a63d3f57d/.default');
    //test
    // const { customApi } = useApiClient('3aa4a235-b6e2-48d5-9195-7fcf05b459b0');

    const [hasErrored, setHasErrored] = useState(false);

    const removeDocument = (value: string) => {
        setDocuments((prev) => prev.filter((x) => x.value !== value));
    };
    const addDocument = (value: TypedSelectOption) => {
        if (!documents.find((x) => x.value === value.value)) {
            setDocuments((prev) => [...prev, value]);
        }
    };

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        setHasErrored(false);
        setTagContainsNoDocuments(false);
        let tagsResult: TypedSelectOption[] = [];
        let documentsResult: TypedSelectOption[] = [];
        try {
            tagsResult = await searchStid(inputValue, 'stidtag', customApi);
        } catch (e) {
            setHasErrored(true);
        }
        try {
            documentsResult = await searchStid(inputValue, 'document', customApi);
        } catch (e) {
            setHasErrored(true);
        }
        const combined = [...documentsResult, ...tagsResult];
        callback(combined.sort((a, b) => sort(a, b, inputValue)));
    };

    return (
        <Fragment>
            <Button
                variant="ghost_icon"
                onClick={() => {
                    setDocuments([]);
                    setIsOpen((prev) => !prev);
                }}
            >
                <Icon name="add" />
                <div>Add document</div>
            </Button>

            {isOpen && (
                <Scrim
                    isDismissable={false}
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

                            <Icon
                                name="close"
                                color={tokens.colors.interactive.primary__resting.hex}
                                onClick={() => {
                                    setDocuments([]);
                                    setIsOpen(false);
                                }}
                            />
                        </StidHeader>
                        <br />
                        <AsyncSelect
                            loadOptions={loadOptions}
                            isMulti
                            isClearable={false}
                            controlShouldRenderValue={false}
                            placeholder={'Search'}
                            components={applyEdsComponents()}
                            onChange={async (
                                newValue: MultiValue<TypedSelectOption>,
                                actionMeta: ActionMeta<TypedSelectOption>
                            ) => {
                                if (actionMeta.option) {
                                    if (actionMeta.option.type === 'document') {
                                        addDocument(actionMeta.option);
                                    } else {
                                        const documents = await getDocumentsByTag(
                                            'JCA',
                                            actionMeta.option.value,
                                            customApi
                                        );
                                        if (documents.length <= 0) setTagContainsNoDocuments(true);
                                        documents.forEach((x) => {
                                            if (x && x.docNo) {
                                                addDocument({
                                                    label: `${x.docNo} - ${x.docTitle}`,
                                                    searchValue: x.docNo,
                                                    object: x,
                                                    type: 'document',
                                                    value: x.docNo,
                                                });
                                            }
                                        });
                                        /**
                                         * Resolve all documents for given tag value
                                         * https://stidapi.equinor.com/JCA/tag/document-refs
                                         */
                                    }
                                }
                            }}
                            styles={applyEdsStyles()}
                            theme={applyEDSTheme}
                        />
                        <br />
                        {hasErrored && <div>Stid call failed</div>}
                        {tagContainsNoDocuments && (
                            <div color="red">This tag contains no documents</div>
                        )}
                        {documents &&
                            documents.map((x) => {
                                return (
                                    <Chip key={x.value}>
                                        <StidDocument document={x.object as Document} />

                                        <Button
                                            variant="ghost_icon"
                                            onClick={() => {
                                                removeDocument(x.value);
                                            }}
                                        >
                                            <Icon
                                                color={
                                                    tokens.colors.interactive.primary__resting.rgba
                                                }
                                                name="clear"
                                            />
                                        </Button>
                                    </Chip>
                                );
                            })}
                        <br />
                        <Button
                            onClick={() => {
                                appendDocuments(documents.map((x) => x.object as Document));
                                setDocuments([]);
                                setIsOpen(false);
                            }}
                        >
                            Confirm
                        </Button>
                    </StidWrapper>
                </Scrim>
            )}
        </Fragment>
    );
};

const StidWrapper = styled.div`
    background-color: white;
    width: 640px;
    min-height: 800px;
    max-height: 100vh;
    overflow: scroll;
    padding: 20px;
`;

const Title = styled.h2`
    font-weight: normal;
`;

const Chip = styled.div`
    text-align: center;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 16px;
    padding: 5px;
`;

const StidHeader = styled.div`
    align-items: center;
    display: flex;
    justify-content: space-between;
`;
