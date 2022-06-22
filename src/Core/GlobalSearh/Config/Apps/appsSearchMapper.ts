import { tokens } from '@equinor/eds-tokens';
import { NavigateFunction } from 'react-router';
import { SearchItem, SearchResult } from '../../Service/SearchApi';

export const appsSearchMapper = (data?: SearchItem[]): SearchResult | undefined => {
    return data && data.length > 0
        ? {
              type: 'apps',
              title: 'Applications',
              color: tokens.colors.interactive.success__resting.rgba,
              action: (id: string, item: SearchItem, navigate: NavigateFunction) => {
                  if (item.uri) {
                      window.open(item.uri, '_blank');
                      return;
                  }

                  navigate(`${item.group}/${id}`);
              },
              items: data,
          }
        : undefined;
};
