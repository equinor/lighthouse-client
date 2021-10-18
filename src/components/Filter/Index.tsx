
import { Checkbox } from "@equinor/eds-core-react";
import { tokens } from "@equinor/eds-tokens";
import { useCallback, useEffect, useState } from "react";
import styled from "styled-components";
import { FilterItemComponent } from "./Components/FilterItem/FilterItem";
import { Garden } from "./Garden";
import { FilterData, FilterItem, FilterItemCheck } from "./Types/FilterItem";


function arrayToDict<T, K extends keyof T>(arr: T[], key: K): Record<string, T> {
    return arr.reduce((a, i) => {
        (a[i[key.toString()]]) || (a[i[key.toString()]] = i);
        return a
    }, {} as Record<string, T>)
}


// type FilterItem = { value: string, type: string, checked: boolean, count: number, show: boolean }
// type FilterGroupe = { all: boolean, type: string, value: Record<string, FilterItem> }
// type FilterDict = Record<string, FilterGroupe>

function arrayFilterDict<T>(arr: T[], exclude?: string[], filterDict?: FilterData): FilterData {
    if (arr.length === 0) return {};
    const newFilterDict = arr.reduce((a, i) => {
        Object.keys(i).map((typeKey: string) => {
            if (exclude && exclude.includes(typeKey)) return;
            if (filterDict && !filterDict[typeKey]) return;
            const value: string = i[typeKey];
            const obj = (a[typeKey]) || (a[typeKey] = filterDict ? filterDict[typeKey] : { value: {}, all: true, type: typeKey });


            if (!obj.value[value]) {
                obj.value[value] = { ...obj.value[value], value, checked: true, type: typeKey }
            } else {
                obj.value[value] = { ...obj.value[value], value, }
            }
        })
        return a
    }, {} as FilterData);
    return newFilterDict;
}





// function updateFilterItemCount<T>(arr: T[], filterDict: FilterDict): FilterDict {

//     Object.keys(filterDict).forEach((key: string) => {
//         Object.keys(filterDict[key].value).forEach(valueKey => {
//             filterDict[key].value[valueKey].count = 0
//             // filterDict[key].value[valueKey].checked = true
//         })
//     })

//     return arrayFilterDict(arr, [], filterDict)


// }

function dictToArray<T>(dict: Record<string, T>): T[] {
    return Object.keys(dict).map((k => dict[k.toString()]))
}






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



function createGarden<T, K extends keyof T>(arr: T[], key: K): Garden<T> {
    return arr.reduce((a, i) => {
        a[i[key.toString()]] || (a[i[key.toString()]] = [])
        if (Array.isArray(a[i[key.toString()]]))
            a[i[key.toString()]].push(i)
        return a
    }, {} as Record<K, T[]>)
}
type Garden<T> = Record<string, T[]>

function filterGarden<T>(filter: FilterData, data: T[]): T[] {

    const newData = data.filter(item => {
        let isDisplay = true;
        Object.keys(item).forEach(key => {
            if (filter[key] && !filter[key].value[item[key]].checked) {
                isDisplay = false;
            }
        });
        return isDisplay;
    });
    return newData;
}

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

        <Garden garden={garden} />

    </>
    );
}

