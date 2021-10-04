import { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 16px;
    align-items: flex-start;
`
const Row = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 4px;
`



const P = styled.p`
    margin: 4px;
    padding: 1rem;
    background-color: #333;
    color: #fff;
    width: 100px;
`

const Pack = styled.p`
    padding: .5rem 1rem;
    margin: 0;
    margin-bottom: 4px;
    background-color: #666;
    color: #fff;
    width: 100px;
    cursor: pointer;

    :hover{
        opacity: .5;
    }
`


interface Item {

    CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo: string;
    Id: number;
    Status__Id: string;
    CheckList__TagFormularType__Tag__TagNo: string;
}

function groupeByKey<T, K extends keyof T>(array: T[], key: K) {
    return array.reduce((results: any, org: T) => {
        (results[org[key]] = results[org[key]] || []).push(org);
        return results;
    }, {});
}

const keys = ["CheckList__TagFormularType__Tag__Project__Name", "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPhase__Id", "PunchListItemNo", "CheckList__TagFormularType__FormularType__Discipline__Id", "Status__Id", "CheckList__TagFormularType__Tag__McPkg__CommPkg__CommPkgNo"]
export const HomePage = () => {
    const [state, setState] = useState<Record<string, Item[]>>({})
    const [key, seKey] = useState<string>("Status__Id")


    useEffect(() => {
        async function getData() {
            const response = await fetch("./data.json");
            const data: Item[] = await response.json();
            setState(groupeByKey(data, key as keyof Item))
        }
        getData();
    }, [key])
    return (<>
        <select value={key} onChange={(e) => {
            seKey(e.currentTarget.value)
        }}>
            {keys.map(optionKey => <option key={optionKey} value={optionKey}>{optionKey}</option>)}
        </select>
        <Wrapper>
            {Object.keys(state).map(rowItem => (<Row key={rowItem}><P>{rowItem}</P>
                {state[rowItem].map(colItem => <Pack onClick={() => {
                    console.log(colItem)
                }} key={colItem.Id}>{colItem.CheckList__TagFormularType__Tag__TagNo}</Pack>)}
            </Row>))}


        </Wrapper>
    </>
    );
}