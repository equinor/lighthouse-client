import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { useEffect } from 'react';
// import { createClient } from '@equinor/portal-client';
import { render } from 'react-dom';
import { Client } from './Core/Client/Framwork';
// import Client from './AppClient';
// import { getAppGroups, getApps } from './apps/apps';
import { initializeClientModules } from './Core/Client/Framwork/modules';
import { useGlobalClientState } from './Core/Client/Framwork/Modules/GlobalState/provider';

EdsIcon.add({ ...icons });

initializeClientModules(async (continuator) => {
    continuator.initClintConfig.path = '/client-config.json';
    await continuator.initClintConfig.configure();

    continuator.settings.configure({
        appsPanelActive: false,
        fullscreenMenuActive: false,
        logging: false,
        isProduction: false,
        clientEnv: 'dev',
    });
}).then((client) => {
    render(<DummyClient modules={client} />, document.getElementById('root'));
});

const DummyClient = ({ modules }: Client) => {
    const { settings } = useGlobalClientState();
    useEffect(() => {
        setTimeout(() => {
            modules.settings.setEnv(true, 'Wooohoooo');
        }, 2000);
    }, [modules]);

    return <pre>MY Global State: {JSON.stringify(settings, null, 2)}</pre>;
};

// createClient({ getApps, getAppGroups }).then((client) => {
//     if (client.authProvider && !(window !== window.parent && !window.opener)) {
//         render(<Client {...client} />, document.getElementById('root'));
//     }
// });
