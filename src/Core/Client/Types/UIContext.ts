import { ClientSettings } from './ClientSettings';

export interface UIFunctionContext {
    toggleAppPanel: VoidFunction;
    toggleMenu: VoidFunction;
}

export type UIContext = UIFunctionContext & ClientSettings;

type VoidFunction = () => void;
