import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { createClient } from '@equinor/lighthouse-portal-client';
import { render } from 'react-dom';
import Client from './AppClient';
import { getAppGroups, getApps } from './apps/apps';
import { fetchComponent, getCreators } from './apps/widgets';
import { ClientFailed } from './Core/Client/ClientLoad/ClientFailed';
import { ClientLoading } from './Core/Client/ClientLoad/ClientLoading';
import { GlobalStyle } from './Core/Client/styleProvider';

EdsIcon.add({ ...icons });
const mount = (Comp: JSX.Element) => {
    const Component = () => Comp;
    render(
        <>
            <GlobalStyle />
            <Component />
        </>,
        document.getElementById('root')
    );
};

mount(<ClientLoading />);

createClient({
    getApps,
    getAppGroups,
    getCreators,
    getCreatorComponent: fetchComponent,
})
    .then((client) => {
        if (client.authProvider && !(window !== window.parent && !window.opener)) {
            mount(<Client {...client} />);
        }
    })
    .catch((e) => mount(<ClientFailed error={e} />));
