import { Breadcrumbs } from '@equinor/eds-core-react';
import { useCallback } from 'react';
import { useLocation } from 'react-router';
import styled from 'styled-components';

import { readClientRegistry } from '../../../Core/Client/Functions';

export const LocationBreadCrumbs = (): JSX.Element => {
    const location = useLocation();

    const createBreadCrumbs = useCallback(() => {
        const paths = location.pathname.split('/').filter((s) => s !== '');
        if (paths.length < 2) {
            return [];
        }

        const clientRegistry = readClientRegistry();
        const groupName: string | undefined = clientRegistry.appGroups[paths[0]].name;
        const appName = clientRegistry.apps.find((s) => s.shortName === paths[1])?.title;
        const tab = paths[2];

        const crumbs: string[] = [];
        if (groupName) crumbs.push(groupName);
        if (appName) crumbs.push(appName);
        if (tab) crumbs.push(tab[0].toUpperCase() + tab.substring(1));

        return crumbs;
    }, [location]);

    return (
        <>
            {createBreadCrumbs().map((s) => (
                <>
                    <BreadcrumbStyle>/</BreadcrumbStyle>
                    <Breadcrumbs key={s}>
                        <BreadcrumbStyle>{s}</BreadcrumbStyle>
                    </Breadcrumbs>
                </>
            ))}
        </>
    );
};

const BreadcrumbStyle = styled.div`
    font-family: Equinor;
    font-size: 14px;
    font-weight: 500;
    line-height: 16px;
    text-align: left;
`;
