import {
    createContext,
    PropsWithChildren,
    useCallback,
    useContext,
    useEffect,
    useState
} from 'react';
import { useDataContext } from './DataProvider';

interface ViewState {
    hasPowerBi: boolean;
    pages: Page[];
    activePage?: Page;
    isFilterActive: boolean;
    hasActiveFilters: boolean;
}

export interface Page {
    pageId: string;
    pageTitle: string;
    default?: boolean;
}

interface ViewContext extends ViewState {
    registerPages(pages: Page[]): void;
    setActivePage(pages: Page): void;
    resetState(): void;
    togglePowerBIFilter(): void;
    setHasActiveFilters(isActive: boolean): void;
}

const Context = createContext({} as ViewContext);

const INIT_STATE = {
    hasPowerBi: false,
    isFilterActive: false,
    hasActiveFilters: false,
    pages: [],
    activePage: {} as Page,
};

export const ViewProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
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

    const registerPages = useCallback((pages: Page[]) => {
        setState((s) => {
            return { ...s, pages };
        });
    }, []);

    const setActivePage = useCallback((page: Page) => {
        setState((s) => {
            return { ...s, activePage: page };
        });
    }, []);

    const togglePowerBIFilter = useCallback(() => {
        setState((s) => {
            return { ...s, isFilterActive: !s.isFilterActive };
        });
    }, []);

    const setHasActiveFilters = useCallback((isActive: boolean) => {
        setState((s) => {
            return { ...s, hasActiveFilters: isActive };
        });
    }, []);

    const resetState = useCallback(() => {
        setState(INIT_STATE);
    }, []);

    return (
        <Context.Provider
            value={{
                ...state,
                registerPages,
                setActivePage,
                resetState,
                togglePowerBIFilter,
                setHasActiveFilters,
            }}
        >
            {children}
        </Context.Provider>
    );
};

export function useViewerContext(): ViewContext {
    return useContext(Context);
}
