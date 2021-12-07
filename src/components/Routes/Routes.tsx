import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { Link, Route, Routes } from 'react-router-dom';
import { AppGroupe, AppManifest, Apps } from '../../apps/apps';
import { useApps } from '../../apps/useApps';
import useClientContext from '../../context/clientContext';
import { HomePage } from '../HomePage/HomePage';
import { DefaultRouteComponent } from './DefaultRouteComponent';

function ComponentWrapper(route: AppManifest) {
    const { appConfig, authProvider } = useClientContext();
    const Component = route.app?.component || DefaultRouteComponent;
    route.app?.setup &&
        route.app.setup({
            ...route,
            appConfig,
            authProvider,
        });

    const api = { ...route, authProvider, appConfig };

    return <Component {...api} />;
}

interface GroupComponentWrapperProps extends AppGroupe {
    links: AppManifest[];
    groupeId: string;
}

function GroupComponentWrapper(group: GroupComponentWrapperProps) {
    return (
        <div>
            This is a AppGroupe
            <h2>{group.name}</h2>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
                {group.links.map((item) => {
                    const CustomIcon = item.icon;
                    return (
                        <div key={`group-link-${item.shortName}`}>
                            <Link className="link" to={`/${group.groupeId}/${item.shortName}`}>
                                {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}

                                {CustomIcon && typeof CustomIcon === 'string' && (
                                    <Icon
                                        name={CustomIcon}
                                        title={item.title}
                                        color={tokens.colors.text.static_icons__secondary.rgba}
                                    />
                                )}

                                {<span>{item.title}</span>}
                            </Link>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export function ClientRoutes(): JSX.Element {
    const { apps, appGroups } = useApps();

    return (
        <Routes>
            <Route path={'/'} element={<HomePage title="Johan Castberg Dashboard" icon="home" />} />
            {Object.keys(appGroups).map((key) => {
                const group = appGroups[key];
                const links = apps.filter((app) => {
                    if (Array.isArray(app.groupe)) {
                        return app.groupe.includes(key as Apps);
                    }
                    return app.groupe === (key as Apps);
                });
                return (
                    <Route
                        key={key}
                        path={`${key}`}
                        element={<GroupComponentWrapper {...group} links={links} groupeId={key} />}
                    />
                );
            })}
            {apps.map((route) => {
                if (route.app?.appType === 'DataViewer') {
                    return (
                        <>
                            <Route
                                key={route.shortName}
                                path={`${route.groupe.toString()}/${route.shortName}`}
                                element={<ComponentWrapper {...route} />}
                            />
                            <Route
                                key={route.shortName + 'id'}
                                path={`${route.groupe.toString()}/${route.shortName}/:id`}
                                element={<ComponentWrapper {...route} />}
                            />
                        </>
                    );
                }
                return (
                    <Route
                        key={route.shortName}
                        path={`${route.groupe.toString()}/${route.shortName}`}
                        element={<ComponentWrapper {...route} />}
                    />
                );
            })}
            {/* <Route element={<Redirect to="/" />} /> */}
        </Routes>
    );
}
