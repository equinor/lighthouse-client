import { useModule } from '@equinor/fusion-framework-react-module';
import { BookmarkModule, IBookmarkModuleProvider } from '@equinor/fusion-framework-module-bookmark';

export function useFusionBookmarks() {
    return useModule<BookmarkModule>('bookmark') as IBookmarkModuleProvider;
}
