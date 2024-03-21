import { useMutation, useQueryClient } from 'react-query';
import { useBookmarkMutations } from '.';
import { BookmarkRequest } from '../types';
import { applyBookmark, saveBookmark } from '../utils';

type Payload<T> = {
  id: string;
  payload: T;
};
type SaveArgs<T> = {
  /** The object that you want to save */
  capturedBookmark: T;

  bookmarkTitle: string;

  /** The current app this bookmark is for (e.g. 'scope-change') */
  appKey: string;

  /** The current subsystem this bookmark is for (e.g. 'ConstructionAndCommissioning') */
  subSystem: string;
};

type UseBookmarkReturn<TPayload> = {
  /** Function that will create a bookmark object and make a POST request to the bookmark API */
  handleSaveBookmarks: (saveArgs: SaveArgs<TPayload>) => Promise<void>;

  /** Function that accepts one bookmarks id and returns the specific bookmark payload after a GET request */
  handleApplyBookmark: (bookmarkId: string) => Promise<TPayload>;
};

/**
 * Hook that handles API calls to bookmark service. Use together with your own functions to handle capturing and applying bookmarks.
 */
export const useBookmarks = <TPayload extends unknown = unknown>(): UseBookmarkReturn<TPayload> => {
  const { mutateAsync: bookmarkApplyAsync } = useMutation(applyBookmark);

  const saveMutation = useBookmarkMutations(saveBookmark);
  return {
    handleSaveBookmarks: async ({ capturedBookmark, bookmarkTitle, appKey, subSystem }) => {
      const bookmarkRequest: BookmarkRequest = {
        name: bookmarkTitle,
        isShared: true,
        appKey: `jc-${appKey}`,
        payload: capturedBookmark,
        sourceSystem: {
          name: 'Castberg-portal',
          identifier: 'cst-portal',
          subSystem,
        },
      };
      saveMutation(bookmarkRequest);
    },

    handleApplyBookmark: async (bookmarkId) => {
      const bookmark = (await bookmarkApplyAsync(bookmarkId)) as Payload<TPayload>;
      return bookmark.payload;
    },
  };
};
