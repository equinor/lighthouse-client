import styled from "styled-components";
import { ListView } from "../../../DataView/DataView";
import { useFilteredData } from "../../../Filter";

const Wrapper = styled.section`
    overflow: scroll;
`


interface Checklist {
    Area__Id: string;
    CommPhase__Id: string;
    CommPkgNo: string;
    CommPriority1__Id: string;
    CommPriority2__Id: string;
    CommPriority3__Id: string;
    CommissioningHandoverStatus: number
    Description: string;
    Id: number
    McStatus__Id: string;
    OperationHandoverStatus: string;
    PlannedCompleted: string;
    PlannedStartup: string;
    Responsible__Id: string;
    Status__Id: string;
}


export const ListTab = () => {

    const data = useFilteredData<Checklist>()

    return (
        <Wrapper>
            <ListView data={data} initialKey={"Responsible__Id"} />
        </Wrapper>
    );
}