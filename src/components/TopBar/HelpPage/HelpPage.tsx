import { useMemo } from 'react';
import { useLocationKey } from '@equinor/filter';

import { getApps } from '../../../apps/apps';
import { ClickableIcon } from '../../Icon/ClickableIcon';

export const HelpPage = (): JSX.Element | null => {
    const locationName = useLocationKey();

    const helpPageUrl = useMemo(
        () => getApps().find(({ shortName }) => shortName === locationName)?.helpPageUrl,
        [locationName]
    );

    if (helpPageUrl) {
        return <ClickableIcon name="help" onClick={() => window.open(helpPageUrl, '_blank')} />;
    }

    return null;
};
