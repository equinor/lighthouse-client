import { useApps } from "@equinor/lighthouse-hooks";
import React from "react";
import {
    Redirect, Route, Switch
} from "react-router-dom";
import styled from "styled-components";
import { HomePage } from "../HomePage/HomePage";


const Wrapper = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 28px;
`

const IconWrapper = styled.div`
    padding: 18px;

`

const Component = ({ icon, title }: { icon: React.FC, title: string }) => {
    const Icon = icon;
    return (<Wrapper>
        <IconWrapper>
            <Icon />
        </IconWrapper>
        <h1>{title}</h1>
    </Wrapper>)
}


export const Routes = () => {
    const { appsAdministration, appsCompletionProcesses, appsSupportCapabilities, menuList } = useApps();
    const allRoutes = [...appsAdministration, ...appsCompletionProcesses, ...appsSupportCapabilities]

    return (

        <Switch>
            <Route exact path={'/'} component={HomePage} />
            <Route exact path={'/mc'} component={HomePage} />
            {allRoutes.map((route, index) => <Route exact key={route.title + index} path={`/${route.title}`} render={() => <Component title={route.title} icon={route.icon} />} />)}
            {menuList.map((route, index) => <Route exact key={route.shortName + index} path={`/${route.shortName}`} render={() => <HomePage {...route} />} />)}
            <Route render={(): JSX.Element => <Redirect to="/" />} />
        </Switch>
    );
}