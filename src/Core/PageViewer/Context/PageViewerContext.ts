import { createContext } from 'react';

export interface PageViewerContext {
    temp: string;
}

export const Context = createContext({} as PageViewerContext);
