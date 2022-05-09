# Bookmarks Manager


## Usage
There are three main parts that have to be implemented to make this component work:
1. Adding event listeners
Creating and applying bookmarks are handled by custom event listeners. To add the event listeners use
`useBookmarkEvents()` hook. This hook will add two event listeners on mount and remove them on dismount.
2. Functions to pass to event listeners
The `useBookmarkEvents` hook needs two functions passed as arguments. First one is the function that will run when trying to save a bookmark, and the second is applying a bookmark.
The hook `useBookmarks()` returns two functions that needs to be a part of these functions passed to `useBookmarkEvents`.
The functions returned from `useBookmarks` handle API calls to the bookmark service. 
3. Visual component
Use any of the components that are exported from the package. They will handle retrieving, deleting and visualization of the bookmarks.

## Example
```tsx
const Example = () => {
const {handleApplyBookmark, handleSaveBookmarks} = useBookmarks<PayloadType, BookmarkType>();	

const applyingABookmark = async (bookmarkId: string, appKey: string, groupName: string) => {
	const bookmark = await handleApplyBookmark(bookmarkId);
	//... do something if bookmark contains X,Y,Z
	// return undefined;
	//else:
	return bookmark
}

useBookmarkEvents({saveFn: handleSaveBookmarks, applyFn: applyingABookmark})
return (
	<BookmarkDropdown appKey="example1" subSystem="examples">
)
}

```