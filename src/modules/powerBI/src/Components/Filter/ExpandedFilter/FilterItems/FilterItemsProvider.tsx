import { createRefContext } from '@equinor/lighthouse-utils';
import { ReactNode } from 'react';

type FilterItemsContext = {
  isSearchActive: boolean;
  searchValue: string;
};
const context = createRefContext<FilterItemsContext>({
  isSearchActive: false,
  searchValue: '',
});

export const { useStore } = context;
export const FilterItemsProvider = ({ children }: { children: ReactNode }): JSX.Element => {
  return <context.Provider>{children}</context.Provider>;
};
