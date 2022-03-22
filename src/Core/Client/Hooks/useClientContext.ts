import { useContext } from 'react';
import { ClientContext as context, ClientContextState } from '../ClientContext/clientContext';
import { AppConfig } from '../Types/AppConfig';
import { ClientContext, Facility, FusionContext, Project } from '../Types/ClientContext';
import { ClientRegistry } from '../Types/ClientRegistry';
import { ClientSettings } from '../Types/ClientSettings';

export function useClientContext(): ClientContextState {
    return useContext(context);
}

export function useContextData(): ClientContext {
    return useClientContext().context;
}

export function useSettings(): ClientSettings {
    return useClientContext().settings;
}

export function useAppConfig(): AppConfig {
    return useClientContext().appConfig;
}

export function useRegistry(): ClientRegistry {
    return useClientContext().registry;
}

export function useFacility(): Facility {
    return useClientContext().context;
}
export function useFusionContext(): FusionContext | undefined {
    return useClientContext().context.fusionContext;
}
export function useProject(): Project {
    return useClientContext().context.project;
}
