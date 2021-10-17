import React from "react"
import styled from "styled-components"
import { CompletionViewHeader } from "./Components/CompletionViewHeader"
import { CompletionViewTabs } from "./Components/CompletionViewTabs"
import { DataProvider } from "./Context/DataProvider"

const CompletionViewWarper = styled.section`


`


export const CompletionView = (props) => {



    return (
        <DataProvider>
            <CompletionViewWarper>
                <CompletionViewHeader {...props} />
                <CompletionViewTabs />
            </CompletionViewWarper>

        </DataProvider>
    );
}