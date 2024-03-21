import { PBIOptions } from '@equinor/lighthouse-powerbi';
import { Report } from 'powerbi-client';
import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { useDataContext } from './DataProvider';

interface ViewState {
  pbiReport?: Report | undefined;
  hasPowerBi: boolean;
  activePage?: Page;
  hasActiveFilters: boolean;
  pbiOptions?: PBIOptions;
}

export interface Page {
  pageId: string;
  pageTitle: string;
  default?: boolean;
}

interface ViewContext extends ViewState {
  registerPages(pages: Page[]): void;
  setActivePage(pages: Page, options?: PBIOptions): void;
  resetState(): void;
  setHasActiveFilters(isActive: boolean): void;
  setPbiReport(pbiReport: Report | undefined): void;
}

const Context = createContext({} as ViewContext);

const INIT_STATE = {
  hasPowerBi: false,
  hasActiveFilters: false,
  pages: [],
  activePage: {} as Page,
};

export const ViewProvider = ({ children }: PropsWithChildren<unknown>): JSX.Element => {
  const [state, setState] = useState<ViewState>(INIT_STATE);
  const { powerBiOptions } = useDataContext();

  const registerPages = useCallback((pages: Page[]) => {
    setState((s) => {
      return { ...s, pages };
    });
  }, []);

  const setActivePage = useCallback((page: Page, pbiOptions?: PBIOptions) => {
    setState((s) => {
      return { ...s, activePage: page, pbiOptions: pbiOptions };
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

  const setPbiReport = (report: Report | undefined) => {
    report?.on('loaded', async () => {
      try {
        const active = await report.getActivePage();
        setState((s) => {
          return {
            ...s,
            activePage: {
              pageId: active.name,
              pageTitle: active.displayName,
            },
            pbiReport: report,
          };
        });
      } catch {
        console.error('Cannot set report');
      }
    });
  };

  useEffect(() => {
    if (powerBiOptions !== undefined) {
      setState((s) => ({
        ...s,
        hasPowerBi: true,
      }));
    } else {
      setState(INIT_STATE);
    }
  }, [powerBiOptions]);
  return (
    <Context.Provider
      value={{
        ...state,
        registerPages,
        setActivePage,
        resetState,
        setHasActiveFilters,
        setPbiReport,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export function useViewerContext(): ViewContext {
  return useContext(Context);
}
