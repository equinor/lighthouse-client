import React from "react"
import styled from "styled-components"
import { CompletionViewHeader } from "./Components/CompletionViewHeader"
import { CompletionViewTabs } from "./Components/CompletionViewTabs"

const CompletionViewWarper = styled.section`

`


export const CompletionView = () => {
    return (
        <CompletionViewWarper>
            <CompletionViewHeader />
            <CompletionViewTabs />
        </CompletionViewWarper>
    );
}