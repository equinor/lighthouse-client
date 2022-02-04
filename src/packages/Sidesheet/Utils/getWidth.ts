import { SidesheetState } from '../State/sidesheetState';

export function getWidth({
    width,
    isMinimized,
    SidesheetComponent,
    minWidth,
    isPinned,
}: SidesheetState<any>): number {
    const isActive = SidesheetComponent !== undefined || isPinned;
    const currentWidth = isMinimized ? minWidth : width;
    return isActive ? currentWidth : isMinimized ? currentWidth : 0;
}
