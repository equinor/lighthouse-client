import { SidesheetState } from '../State/sidesheetState';

export function getWidth({
    width,
    isMinimized,
    SidesheetComponent,
    minWidth,
}: SidesheetState<any>): number {
    const isActive = SidesheetComponent !== undefined;
    const currentWidth = isMinimized ? minWidth : width;
    return isActive ? currentWidth : isMinimized ? currentWidth : 0;
}
