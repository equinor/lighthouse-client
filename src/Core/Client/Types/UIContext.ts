import { ClientSettings } from './ClientSettings';

export interface UIFunctionContext {
    toggleAppPanel: VoidFunction;
    toggleFullscreenMenu: VoidFunction;
}

export type UIContext = UIFunctionContext & ClientSettings;

type VoidFunction = () => void;
