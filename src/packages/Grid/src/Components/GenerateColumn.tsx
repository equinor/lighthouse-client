import { Button, MultiSelect, Scrim, SingleSelect, TextField } from '@equinor/eds-core-react';
import { useState } from 'react';
import styled from 'styled-components';
import { ColumnDefintion } from '../../../../Core/WorkSpace/src/WorkSpaceApi/State';
import { valueFormatter } from '../Utils/buildColumnDef';

interface GenerateColumnProps<T> {
    item: T;
    appendColumn: (colDef: ColumnDefintion<T>) => void;
    isOpen: boolean;
    onClose: () => void;
}

export function GenerateColumn<T>({
    item,
    appendColumn,
    isOpen,
    onClose,
}: GenerateColumnProps<T>): JSX.Element {
    const [fieldName, setFieldName] = useState<string | undefined>(undefined);
    const [chosenField, setChosenField] = useState<null | keyof T>(null);
    const [chosenAttributes, setChosenAttributes] = useState<null | T[keyof T][]>(null);

    function submit() {
        if (chosenField === null || chosenAttributes === null || !fieldName) return;
        appendColumn({
            field: fieldName as keyof T,
            valueGetter: (props) => {
                let value = '';

                chosenAttributes.map((x) => {
                    value += `${props.data[chosenField][x]} `;
                });
                setChosenAttributes(null);
                return value;
            },
            valueFormatter: valueFormatter,
            initialHide: false,
        });
        onClose();
    }

    return (
        <>
            {isOpen && (
                <Scrim>
                    <ScrimContainer>
                        <ContentWrapper>
                            <h3>Generate new column</h3>

                            <TextField
                                id="fieldName"
                                label='Column name'
                                value={fieldName}
                                placeholder={"Enter column name"}
                                onChange={(e) => setFieldName(e.target.value)}
                            />
                            <Spacer />

                            <SingleSelect
                                label={'Pick field'}
                                items={Object.keys(item).filter(
                                    (x) => typeof item[x] === 'object' && !Array.isArray(item[x])
                                )}
                                handleSelectedItemChange={(change) => {
                                    change.selectedItem
                                        ? setChosenField(change.selectedItem as keyof T)
                                        : setChosenField(null);
                                }}
                            />
                            <Spacer />
                            {chosenField && (
                                <MultiSelect
                                    label={'Pick attribute'}
                                    items={Object.keys(item[chosenField])}
                                    handleSelectedItemsChange={(change) => {
                                        change.selectedItems
                                            ? setChosenAttributes(
                                                  change.selectedItems as unknown as T[keyof T][]
                                              )
                                            : setChosenAttributes(null);
                                    }}
                                />
                            )}
                            <Spacer />
                            <ButtonContainer>
                                <Button onClick={onClose} variant="outlined">
                                    Cancel
                                </Button>
                                <HorizontalSpacer />
                                <Button
                                    disabled={!chosenAttributes || !chosenField || !fieldName}
                                    onClick={submit}
                                >
                                    Add
                                </Button>
                            </ButtonContainer>
                        </ContentWrapper>
                    </ScrimContainer>
                </Scrim>
            )}
        </>
    );
}

const HorizontalSpacer = styled.div`
    width: 1em;
`;


const ContentWrapper = styled.div`
width: 100%;
`

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
    width: 100%;
    align-items: center;
    padding: 0em 0em;
`;

const ScrimContainer = styled.div`
    background: white;
    height: 500px;
    width: 500px;
    border-radius: 5%;
    display: flex;
    padding: 2em;
`;

const Spacer = styled.div`
    height: 2em;
`;
