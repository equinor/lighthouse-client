import { MultiSelect as Select, Chip } from '@equinor/eds-core-react';

import { ChipContainer } from './Styles/ChipContainer';
import { Value } from '../../Types/value';
import { MultiSelectObject as MultiSelectObjectInterface } from '../../Types/inputType';
import { useMemo, useState } from 'react';
import styled from 'styled-components';

interface MultiSelectObjectProps {
    setter: (value: any[]) => Promise<void>;
    field: Value<any[]>;
    editMode: boolean;
    selectItems: any[];
    inputType: MultiSelectObjectInterface;
    CustomComponent?: React.FC<{
        setter: (value: any[]) => Promise<void>;
        field: Value<any[]>;
        editMode: boolean;
        selectItems: any[];
    }>;
}

export const MultiSelectObject = ({
    setter,
    field,
    editMode,
    selectItems,
    CustomComponent,
    inputType,
}: MultiSelectObjectProps): JSX.Element => {
    const initialSelected = useMemo(() => {
        const templist: string[] = [];
        Object.keys(field.value).map((x) => {
            templist.push(field.value[x][inputType.objectIdentifier]);
        });
        return templist;
    }, [field.value, inputType.objectIdentifier]);

    const [selectedOptions, setSelectedOptions] = useState<string[] | undefined>(
        field.value ? initialSelected : []
    );

    const selectOptions: string[] = useMemo(() => {
        return selectItems.map((x) => x[inputType.objectIdentifier].toString());
    }, [inputType.objectIdentifier, selectItems]);

    const findObjectsByIds = (ids: string[]): any[] => {
        const tempArray: any[] = [];

        selectItems.forEach((x) => {
            ids.forEach((y) => {
                if (x.id.toString() === y) {
                    tempArray.push(x);
                }
            });
        });

        return tempArray;
    };

    const handleRemove = (id: string) => {
        if (!selectedOptions) {
            return;
        }
        const list = selectedOptions;

        const index = selectedOptions.indexOf(id);
        if (index > -1) {
            list.splice(index, 1);
        }

        setSelectedOptions(list);
        const objects = findObjectsByIds(list);
        setter(objects);
    };

    return (
        <>
            {CustomComponent ? (
                <CustomComponent
                    setter={setter}
                    field={field}
                    editMode={editMode}
                    selectItems={selectOptions}
                />
            ) : (
                <MultiSelectObjectContainer>
                    <Select
                        style={{ marginBottom: '0.2em' }}
                        disabled={editMode ? !field?.editable : false}
                        items={selectOptions}
                        label={''}
                        initialSelectedItems={selectedOptions}
                        placeholder={`Select ${field.label}`}
                        handleSelectedItemsChange={(select) => {
                            setSelectedOptions(select.selectedItems);
                            if (!select.selectedItems) {
                                setter([]);
                            } else {
                                const objects = findObjectsByIds(select.selectedItems);
                                setter(objects);
                            }
                        }}
                    />
                    <ChipContainer>
                        {selectedOptions &&
                            selectedOptions.map((x) => {
                                return (
                                    <Chip key={x}>
                                        {x}
                                        <RemoveButton onClick={() => handleRemove(x)}>
                                            x
                                        </RemoveButton>
                                    </Chip>
                                );
                            })}
                    </ChipContainer>
                </MultiSelectObjectContainer>
            )}
        </>
    );
};

const MultiSelectObjectContainer = styled.div`
    display: flex;
    flex-direction: column;
`;

const RemoveButton = styled.div`
    display: flex;
    color: black;
`;
