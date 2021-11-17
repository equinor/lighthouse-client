import { SingleSelect } from '@equinor/eds-core-react';
import { FC, useEffect, useState } from 'react';
import { Wrapper } from '../../Filter/Components/FilterGroup/FilterGroup-Styles';


interface FilterSelectorProps {
    groupingOptions: string[];
    rootKey: string;
    setRootKey: React.Dispatch<React.SetStateAction<string>>;
    setGroupKeys: React.Dispatch<React.SetStateAction<string[]>>;
    groupKeys: string[];

}

export const FilterSelector: FC<FilterSelectorProps> = ({ groupingOptions, rootKey, setRootKey, setGroupKeys, groupKeys }: FilterSelectorProps): JSX.Element => {
    const [selectedOption, setSelectedOption] = useState<string>("");


    const handleSelectedItemsChanged = (newValue: string | null | undefined, index: number) => {
        if (newValue === null) {
            let newKeys: string[] = [];

            for (let i = 0; i < index; i++) {
                newKeys.push(groupKeys[i]);
            }
            setGroupKeys([...newKeys]);
        } else {
            newValue && setGroupKeys([...groupKeys, newValue]);
        }
    }

    return (
        <div style={{
            display: "flex", justifyContent: "left"
        }}>
            <p> Group by</p >
            <div style={{ width: "200px" }}>
                <SingleSelect
                    items={groupingOptions}
                    label={"Group by"}
                    initialSelectedItem={rootKey}
                    handleSelectedItemChange={(changes) => {
                        if (changes.selectedItem === null) {
                            return;
                        }
                        changes.selectedItem && setRootKey(changes.selectedItem);
                        setGroupKeys([]);
                    }}
                />
            </div>
            {

                groupKeys.map((x, index) => {
                    return (
                        <>
                            <p>then</p>
                            <SingleSelect
                                items={groupingOptions}
                                label={""}
                                initialSelectedItem={x}
                                handleSelectedItemChange={(changes) => {
                                    handleSelectedItemsChanged(changes.selectedItem, index);
                                }}
                            />
                        </>);
                })
            }
            <p>then </p>
            <SingleSelect
                items={groupingOptions}
                label={""}
                selectedOption={selectedOption}
                handleSelectedItemChange={(changes) => {
                    changes.selectedItem && setGroupKeys([...groupKeys, changes.selectedItem]);
                    setSelectedOption("");
                }}
            />
        </div >
    )
}

