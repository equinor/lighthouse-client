import { addFunction } from '../Core/Providers/functionController';
import { addWidgets } from '../Core/Widgets/WidgetsProvider';
import { changeFunction, changeSideSheetWidget } from './ScopeChangeRequest/ScopeChangeRequestApp';
import { swcrSideSheetWidget } from './swcr';

export const setupWidgets = (): void => {
    addFunction(changeFunction);
    addWidgets([swcrSideSheetWidget, changeSideSheetWidget]);
};
