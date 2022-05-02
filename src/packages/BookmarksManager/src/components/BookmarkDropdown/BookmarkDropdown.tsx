import { Popover } from '@equinor/eds-core-react';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useRef, useState } from 'react';
import { BookmarkList } from './BookmarkList';
import { CreateNewBookmark } from './CreateNewBookmark';
/**
 * Component for displaying bookmarks in a dropdown.
 * Used per app, will only get bookmarks per app.
 */

type BookmarkDropdownProps = {
    appKey?: string;
    subSystem?: string;
};
export const BookmarkDropdown = ({
    appKey = 'installation',
    subSystem = 'ConstructionAndCommissioning',
}: BookmarkDropdownProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <div>
            <div ref={anchorRef}>
                <ClickableIcon name="bookmarks" onClick={() => setIsPopoverOpen(!isPopoverOpen)} />
            </div>

            <Popover
                open={isPopoverOpen}
                anchorEl={anchorRef.current}
                placement="bottom-end"
                // onClose={() => setIsPopoverOpen(false)}
            >
                <Popover.Title>My Bookmarks</Popover.Title>
                <Popover.Content>
                    <CreateNewBookmark appKey={appKey} subSystem={subSystem} />
                    <hr />

                    <BookmarkList appKey={appKey} />
                </Popover.Content>
            </Popover>
        </div>
    );
};
