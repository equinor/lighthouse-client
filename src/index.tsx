import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { createClient } from '@equinor/portal-client';
import { render } from 'react-dom';
import Client from './AppClient';
import { getAppGroups, getApps } from './apps/apps';
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

createClient({ getApps, getAppGroups })
    .then((authProvider) => {
        if (authProvider && !(window !== window.parent && !window.opener)) {
            mount(<Client authProvider={authProvider} />);
        }
    })
    .catch((e) => mount(<ClientFailed error={e} />));
