import { PropsWithChildren, useReducer } from 'react';
import { Context } from './PageViewerContext';
import { pageViewerReducer } from './PageViewerReducer';

interface PageViewerContextProviderProps extends PageViewerState {
    temp?: string;
}

export interface PageViewerState {
    temp2?: string;
}

export function PageViewerContextProvider({
    children,
}: PropsWithChildren<PageViewerContextProviderProps>): JSX.Element {
    const [state] = useReducer(pageViewerReducer, {});

    return <Context.Provider value={{ ...state, temp: '' }}>{children}</Context.Provider>;
}
