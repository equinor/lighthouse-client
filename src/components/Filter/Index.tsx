
import { Checkbox } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FilterItemComponent } from "./Components/FilterItem/FilterItem";
import { FilterData, FilterItem, FilterItemCheck } from "./Types/FilterItem";






// function updateFilterItemCount<T>(arr: T[], filterDict: FilterDict): FilterDict {

//     Object.keys(filterDict).forEach((key: string) => {
//         Object.keys(filterDict[key].value).forEach(valueKey => {
//             filterDict[key].value[valueKey].count = 0
//             // filterDict[key].value[valueKey].checked = true
//         })
//     })

//     return arrayFilterDict(arr, [], filterDict)


// }


const RWrapper = styled.div`
    display: flex;
    flex-direction: row;
    height: 200px;
    overflow: scroll;
    
`

const CWrapper = styled.div`
    display: flex;
    flex-direction: column;
    padding: .5em;
    max-width: 200px;
    word-wrap: break-word;
    background-color: ${tokens.colors.ui.background__light.rgba};

    label{
        font-size: 1rem;
        padding: 0;
        span {
            padding: .1rem;

        }
        svg{
            height: 16px;
            width: 16px;
        }
    }
`





interface Item {

    CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    Id: number;
    Status__Id: string;
    CheckList__TagFormularType__Tag__TagNo: string;
    PunchListSorting__Id: string;
}


export const Filter = () => {

    const [garden, setGarden] = useState({});
    const [data, setData] = useState<Item[]>([]);
    const [filterDict, setFilterDict] = useState<FilterData>({})


    useEffect(() => {
        setFilterDict(arrayFilterDict(data, ["PunchListType__Description", "Id", "UpdatedAt", "Description", "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo", "PunchListItemNo", "CheckList__TagFormularType__Tag__TagNo"]))
        setGarden(createGarden(data, "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo"))
    }, [data])

    useEffect(() => {
        async function getData() {
            const response = await fetch("./data.json");
            const d: Item[] = await response.json();
            setData(d)
        }
        getData()
    }, [])

    const filterItemCheck: FilterItemCheck = useCallback((filterItem: FilterItem, singleClick?: boolean): void => {

        if (singleClick) {
            Object.keys(filterDict[filterItem.type].value).forEach(key => {
                filterDict[filterItem.type].value[key].checked = key === filterItem.value ? true : false
            })
        } else {
            filterDict[filterItem.type].value[filterItem.value].checked = !filterDict[filterItem.type].value[filterItem.value].checked;
        }
        const gardenData = filterGarden(filterDict, data)
        setGarden(createGarden(gardenData, "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo"))
        // const newFilterDict = updateFilterItemCount(gardenData, filterDict)
        // setFilterDict(newFilterDict)
    }, [filterDict, data])


    return (<>
        <RWrapper>
            {dictToArray(filterDict).map((i, index) => (
                <CWrapper key={`col-${i}-${index}`}
                ><h4>{i.type}</h4>
                    <Checkbox title={"All"} label={"All"} checked={i.all} onChange={() => { console.log("check") }} />
                    {
                        Object.keys(i.value).map((key, index) => {
                            const item = i.value[key];
                            return (
                                <>
                                    {<FilterItemComponent
                                        key={item.value}
                                        filterItem={item}
                                        filterItemCheck={filterItemCheck}
                                    />}
                                </>
                            );
                        })
                    }
                </CWrapper>))}
        </RWrapper>

    </>
    );
}

