import Widget from '@equinor/lighthouse-widgets';
import { PropsWithChildren, useEffect } from 'react';
import { openSidesheetById } from '../Functions';
import { handleExtractHashUrl } from '../Utils/urlHandler';

const mountSidesheetFromUrl = async () => {
    const { widgetId, itemId } = handleExtractHashUrl();
    if (widgetId) {
        try {
            const manifest = await Widget.getWidgetManifest(widgetId);
            await openSidesheetById(manifest.widgetId, itemId);
        } catch (error) {
            console.warn(error);
        }
    }
};

export const SidesheetLoader = ({ children }: PropsWithChildren<any>): JSX.Element => {
    useEffect(() => {
        if (window.location.hash.length > 0) {
            mountSidesheetFromUrl();
        }
        window.addEventListener('hashchange', mountSidesheetFromUrl, false);
        return () => {
            window.removeEventListener('hashchange', mountSidesheetFromUrl, false);
        };
    }, []);

    return <>{children}</>;
};
