import { Icon as EdsIcon } from '@equinor/eds-core-react';
import * as icons from '@equinor/eds-icons';
import { createClient } from '@equinor/portal-client';
import { render } from 'react-dom';
import Client from './AppClient';
import { getAppGroups, getApps } from './apps/apps';

EdsIcon.add({ ...icons });

createClient({ getApps, getAppGroups }).then((client) => {
    if (client.authProvider && !(window !== window.parent && !window.opener)) {
        render(<Client {...client} />, document.getElementById('root'));
    }
});
