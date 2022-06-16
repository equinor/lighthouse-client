import { Popover } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { ClickableIcon } from '@equinor/lighthouse-components';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { useRef, useState } from 'react';
import { TabButton } from '../../../../../Core/WorkSpace/src/Components/ToggleButton';
import { BookmarkList } from './BookmarkList';
import { CreateNewBookmark } from './CreateNewBookmark';
/**
 * Component for displaying bookmarks in a dropdown.
 * Used per app, will only get bookmarks per app.
 */

type BookmarkDropdownProps = {
    appKey: string;
    subSystem: string;
    style?: JSX.IntrinsicElements['div']['style'];
};
export const BookmarkDropdown = ({
    appKey,
    subSystem,
    style,
}: BookmarkDropdownProps): JSX.Element => {
    const [isPopoverOpen, setIsPopoverOpen] = useState<boolean>(false);

    const anchorRef = useRef<HTMLDivElement>(null);
    const { apps } = useRegistry();
    const app = apps.find((app) => appKey === app.shortName);
    return (
        <div style={style}>
            <div ref={anchorRef}>
                <TabButton
                    color={tokens.colors.interactive.primary__resting.hex}
                    onClick={() => setIsPopoverOpen(!isPopoverOpen)}
                    aria-selected={isPopoverOpen}
                >
                    <ClickableIcon name="bookmarks" />
                </TabButton>
            </div>

            <Popover
                open={isPopoverOpen}
                anchorEl={anchorRef.current}
                placement="auto-end"
                onClose={() => setIsPopoverOpen(false)}
            >
                <Popover.Title>My {app?.title} Bookmarks</Popover.Title>
                <Popover.Content>
                    <CreateNewBookmark appKey={appKey} subSystem={subSystem} />
                    <hr />

                    <BookmarkList appKey={appKey} />
                </Popover.Content>
            </Popover>
        </div>
    );
};
