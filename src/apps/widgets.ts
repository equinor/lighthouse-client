import { Functions } from '../Core/Functions/Api/functionsApi';
import { Widget } from '../Core/Widgets/Api/widgetApi';
import { changeFunction, changeSideSheetWidget } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { swcrSideSheetWidget } from './swcr';

export const setupWidgets = (): void => {
    Functions.addFunction(changeFunction);
    Widget.addWidgets([swcrSideSheetWidget, changeSideSheetWidget]);
};
