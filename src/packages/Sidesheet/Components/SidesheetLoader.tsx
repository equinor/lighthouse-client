import Widget from '@equinor/lighthouse-widgets';
import { PropsWithChildren, useCallback, useEffect } from 'react';
import { useLocation } from 'react-router';
import { openSidesheetById } from '../Functions';
import { handleExtractHashUrl } from '../Utils/urlHandler';

export const SidesheetLoader = ({ children }: PropsWithChildren<any>): JSX.Element => {
    const location = useLocation();

    const mountSidesheetFromUrl = useCallback(async () => {
        const { widgetId, itemId } = handleExtractHashUrl();
        if (widgetId) {
            try {
                const manifest = await Widget.getWidgetManifest(widgetId);
                await openSidesheetById(manifest.widgetId, itemId);
            } catch (error) {
                console.warn(error);
            }
        }
    }, []);

    useEffect(() => {
        if (location.hash.length > 0) {
            mountSidesheetFromUrl();
        }
    }, []);

    return <>{children}</>;
};
