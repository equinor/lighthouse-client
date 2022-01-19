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
import { Document } from '../../Api/Search/STID/Types/Document';
import { StidDocument } from '../StidDocument';

interface StidSelectorProps {
    appendDocuments: (documents: Document[]) => void;
}

export const StidSelector = ({ appendDocuments }: StidSelectorProps): JSX.Element => {
    const [isOpen, setIsOpen] = useState(false);
    const [documents, setDocuments] = useState<TypedSelectOption[]>([]);
    const { customApi } = useApiClient('1734406c-3449-4192-a50d-7c3a63d3f57d/.default');

    const removeDocument = (value: string) =>
        setDocuments((prev) => prev.filter((x) => x.value !== value));
    const addDocument = (value: TypedSelectOption) => setDocuments((prev) => [...prev, value]);

    const loadOptions = async (
        inputValue: string,
        callback: (
            options: OptionsOrGroups<TypedSelectOption, GroupBase<TypedSelectOption>>
        ) => void
    ) => {
        callback(await searchStid(inputValue, 'document', customApi));
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
                            onChange={(
                                newValue: MultiValue<TypedSelectOption>,
                                actionMeta: ActionMeta<TypedSelectOption>
                            ) => {
                                if (actionMeta.option) {
                                    addDocument(actionMeta.option);
                                }
                            }}
                            styles={applyEdsStyles()}
                            theme={applyEDSTheme}
                        />
                        {documents &&
                            documents.map((x) => {
                                return (
                                    <Chip key={x.value}>
                                        <StidDocument document={x.object as Document} />

                                        <Icon
                                            color={tokens.colors.interactive.primary__resting.rgba}
                                            onClick={() => {
                                                removeDocument(x.value);
                                            }}
                                            name="clear"
                                        />
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
