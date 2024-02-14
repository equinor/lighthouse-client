import { Breadcrumbs } from '@equinor/eds-core-react-old';
import { Fragment, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { readClientRegistry } from '../../../Core/Client/Functions';

function isNewAppLoaded() {
    return (
        window.location.href.includes('handover-new') ||
        window.location.href.includes('mechanical-completion')
    );
}

export const LocationBreadCrumbs = (): JSX.Element => {
    const location = useLocation();
    const clientRegistry = readClientRegistry();
    const paths = location.pathname.split('/').filter((s) => s !== '');
    const appName = clientRegistry.apps.find((s) => s.shortName === paths.at(1))?.shortName;

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
                    <Link to={getRedirectUrl(appName)}>Click here</Link>
                </div>
            )}
        </>
    );
};

function getRedirectUrl(key: string | undefined) {
    if (key === 'mechanical-completion') {
        return 'ConstructionAndCommissioning/mc';
    }
    if (key === 'handover-new') {
        return 'ConstructionAndCommissioning/handover';
    }
    return 'ConstructionAndCommissioning/handover-new';
}

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
