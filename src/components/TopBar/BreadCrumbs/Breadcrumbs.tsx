import { Breadcrumbs } from '@equinor/eds-core-react';
import { Fragment, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import styled from 'styled-components';

import { readClientRegistry } from '../../../Core/Client/Functions';

function isNewAppLoaded() {
    return window.location.href.includes('handover-new');
}

export const LocationBreadCrumbs = (): JSX.Element => {
    const location = useLocation();

    const createBreadCrumbs = useCallback(() => {
        const paths = location.pathname.split('/').filter((s) => s !== '');
        if (paths.length === 0) {
            return [];
        }

        const clientRegistry = readClientRegistry();
        const groupName: string | undefined = clientRegistry.appGroups[paths[0]].name;
        const appName = clientRegistry.apps.find((s) => s.shortName === paths[1])?.title;
        const tab = paths[2];

        const crumbs: Crumb[] = [];
        if (groupName) crumbs.push({ displayName: groupName, pathName: paths[0] });
        if (appName) crumbs.push({ displayName: appName, pathName: `${paths[0]}/${paths[1]}` });
        if (tab)
            crumbs.push({
                displayName: tab[0].toUpperCase() + tab.substring(1),
                pathName: location.pathname,
            });

        return crumbs;
    }, [location]);

    const navigate = useNavigate();

    return (
        <>
            {createBreadCrumbs().map(({ displayName, pathName }, i) => (
                <Fragment key={pathName}>
                    <BreadcrumbStyle>/</BreadcrumbStyle>
                    <Breadcrumbs>
                        <BreadcrumbStyle onClick={() => navigate(pathName)}>
                            {displayName}
                        </BreadcrumbStyle>
                    </Breadcrumbs>
                </Fragment>
            ))}
            {isNewAppLoaded() && (
                <div style={{ color: 'red' }}>
                    Looking for the old app?
                    <a href={window.location.href.split('-new')[0].toString()}>Click here</a>
                </div>
            )}
        </>
    );
};

const BreadcrumbStyle = styled.div`
    font-family: Equinor;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
    cursor: pointer;
`;

interface Crumb {
    pathName: string;
    displayName: string;
}
