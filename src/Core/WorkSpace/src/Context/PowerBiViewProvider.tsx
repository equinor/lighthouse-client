import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useDataContext } from './DataProvider';

interface ViewState {
    activeView: boolean;
    hasPowerBi: boolean;
    pages: Page[];
    activePage?: Page;
}

export interface Page {
    pageId: string;
    pageTitle: string;
    default?: boolean;
}

interface ViewContext extends ViewState {
    toggleView(): void;
    registerPages(pages: Page[]): void;
    setActivePage(pageId): void;
    resetState(): void;
}

const Context = createContext({} as ViewContext);

const INIT_STATE = {
    activeView: false,
    hasPowerBi: false,
    pages: [],
    activePage: {} as Page,
};

export const PowerBIViewContextProvider = ({
    children,
}: PropsWithChildren<unknown>): JSX.Element => {
    const [state, setState] = useState<ViewState>(INIT_STATE);
    const { powerBiOptions } = useDataContext();

    useEffect(() => {
        if (powerBiOptions !== undefined) {
            setState((s) => ({
                ...s,
                hasPowerBi: true,
                pages: powerBiOptions.pages,
                activePage: powerBiOptions.pages.find((p) => p.default),
            }));
        }
    }, [powerBiOptions]);

    function toggleView() {
        setState((s) => {
            return { ...s, activeView: !s.activeView };
        });
    }

    function registerPages(pages: Page[]) {
        setState((s) => {
            return { ...s, pages };
        });
    }
    function setActivePage(page: Page) {
        setState((s) => {
            return { ...s, activePage: page };
        });
    }

    function resetState() {
        setState(INIT_STATE);
    }
    return (
        <Context.Provider
            value={{ ...state, toggleView, registerPages, setActivePage, resetState }}
        >
            {children}
        </Context.Provider>
    );
};

export function useViewerContext(): ViewContext {
    return useContext(Context);
}
