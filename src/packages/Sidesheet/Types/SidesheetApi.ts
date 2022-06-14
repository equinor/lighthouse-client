import { WidgetManifest } from '@equinor/lighthouse-widgets';
import { MenuItem } from '@equinor/overlay-menu';
import { openSidesheet } from '../Functions';
import { ToggleFunction } from '../Hooks/useInternalSidesheetFunction';

export interface SidesheetApi {
    closeSidesheet: () => void;
    setIsMinimized: (isMinimized: boolean | ToggleFunction) => void;
    setWidth: (width: number) => void;
    setTitle: (items: string | JSX.Element | null | undefined) => void;
    setMenuItems: (menuItems: MenuItem[]) => void;
    swapComponent: <T>(
        component?: CustomSidesheet<T>,
        props?: T,
        manifest?: Partial<WidgetManifest>
    ) => void;
    setHasUnsavedChanges: (hasUnsaved: boolean) => void;
}

export type CustomSidesheet<T> = React.FC<{ item: T; actions: SidesheetApi }>;

export type OpenSidesheetFunc = typeof openSidesheet;
