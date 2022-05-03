import { Popover } from '@equinor/eds-core-react';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useRef, useState } from 'react';
import { BookmarkList } from './BookmarkList';
import { CreateNewBookmark } from './CreateNewBookmark';
import { HeaderButton } from './HeaderButton';
/**
 * Component for displaying bookmarks in a dropdown.
 * Used per app, will only get bookmarks per app.
 */

type BookmarkDropdownProps = {
    appKey?: string;
    subSystem?: string;
    style?: JSX.IntrinsicElements['div']['style'];
};
export const BookmarkDropdown = ({
    appKey = 'installation',
    subSystem = 'ConstructionAndCommissioning',
    style,
}: BookmarkDropdownProps) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const anchorRef = useRef<HTMLDivElement>(null);

    return (
        <div style={style}>
            <div ref={anchorRef}>
                <HeaderButton
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    aria-selected={isPopoverOpen}
                >
                    <ClickableIcon name="bookmarks" />
                </HeaderButton>
            </div>

            <Popover
                open={isPopoverOpen}
                anchorEl={anchorRef.current}
                placement="auto"
                onClose={() => setIsPopoverOpen(false)}
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
