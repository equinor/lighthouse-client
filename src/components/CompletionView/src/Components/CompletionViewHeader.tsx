import { Breadcrumbs, SingleSelect } from "@equinor/eds-core-react";
import React from "react";
import styled from "styled-components";


const { Breadcrumb } = Breadcrumbs;

const HeaderWrapper = styled.section`
    height: 100%;
    width: 100vw;
    display: flex;
    flex-direction: column;
`
const BreadcrumbWrapper = styled.section`
    padding: .5rem;
`
const ActionWrapper = styled.section`
    padding: .5rem;
    width: 40%;
`


/**
 * Implementation Speck
 *  - [] Make the Breadcrumbs according to Router location and mak it clickable to navigate.
 *  - [] Make a dropdown for selection data set to view.
 *  - [] Add Filter Section, maybe need to be its own section and component.
 */


const items = [
    "Commissioning packages",
    "Mechanical Completion packages"
]

export const CompletionViewHeader = () => {

    function handleClick() {
        console.log("click")
    }

    return (
        <HeaderWrapper>
            <BreadcrumbWrapper>

                <Breadcrumbs>
                    <Breadcrumb href="#" onClick={handleClick}>
                        Completion management
                    </Breadcrumb>

                    <Breadcrumb
                        href="#"
                        onClick={handleClick}
                        aria-current="page"
                    >
                        Handover
                    </Breadcrumb>
                </Breadcrumbs>
            </BreadcrumbWrapper>
            <ActionWrapper>

                <SingleSelect
                    label="Select data set"
                    initialSelectedItem="Commissioning packages"
                    items={items}
                />
            </ActionWrapper>
        </HeaderWrapper>
    )
}