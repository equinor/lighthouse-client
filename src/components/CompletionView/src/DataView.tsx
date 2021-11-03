import styled from "styled-components";
import { DataViewer } from "./Components/DataViewer";
import { DataProvider } from "./Context/DataProvider";


const CompletionViewWarper = styled.section``;

export const DataView = (props) => {

    return (
        <DataProvider>
            <DataViewer {...props} />
        </DataProvider >
    );
}