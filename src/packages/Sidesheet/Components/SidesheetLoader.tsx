import Widget from '@equinor/lighthouse-widgets';
import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router';
import { openSidesheetById } from '../Functions';
import { handleExtractHashUrl } from '../Utils/urlHandler';

const mountSidesheetFromUrl = async (widgetId?: string, itemId?: string) => {
    if (widgetId) {
        try {
            const manifest = await Widget.getWidgetManifest(widgetId);
            await openSidesheetById(manifest.widgetId, itemId);
        } catch (error) {
            console.warn(error);
        }
    }
};

const handleHashchange = () => {
    const { widgetId, itemId } = handleExtractHashUrl();
    mountSidesheetFromUrl(widgetId, itemId);
};

export const SidesheetLoader = ({ children }: PropsWithChildren<any>): JSX.Element => {
    const location = useLocation();
    useEffect(() => {
        if (window.location.hash.length > 0) {
            mountSidesheetFromUrl();
        }
        if ('onhashchange' in window) {
            window.addEventListener('hashchange', handleHashchange, false);
        }
        return () => {
            if ('onhashchange' in window) {
                window.removeEventListener('hashchange', handleHashchange, false);
            }
        };
    }, []);

    useEffect(() => {
        if ('onhashchange' in window) {
            const values = location.hash.replace('#', '').split('/');
            mountSidesheetFromUrl(values[0], values[1]);
        }
    }, [location]);

    return <>{children}</>;
};
