import { ToggleFunction } from '../Hooks/useInternalSidesheetFunction';

export interface SidesheetApi {
    closeSidesheet: () => void;
    setIsMinimized: (isMinimized: boolean | ToggleFunction) => void;
    setWidth: (width: number) => void;
    setTitle: React.Dispatch<React.SetStateAction<JSX.Element | null | undefined>>;
    setMenuItems: (menuItems: MenuItem[]) => void;
}

export interface MenuItem {
    label: string;
    onClick?: () => void;
    icon?: JSX.Element;
    isDisabled?: boolean;
}
