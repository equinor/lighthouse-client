import { Functions } from '@equinor/lighthouse-functions';
import { Widget } from '@equinor/lighthouse-widgets';
import { changeFunction, changeSideSheetWidget } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { swcrSideSheetWidget } from './swcr';

export const setupWidgets = (): void => {
    Functions.addFunction(changeFunction);
    Widget.addWidgets([swcrSideSheetWidget, changeSideSheetWidget]);
};
