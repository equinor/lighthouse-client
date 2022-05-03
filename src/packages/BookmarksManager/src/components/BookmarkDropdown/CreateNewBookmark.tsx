import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import { bookmarkEvents } from '../../utils';
import {
    CreateNewBookmarkWrapper,
    CreatingNewBookmarkWrapper,
    TitleInput,
} from './BookmarkDropdown.styles';
type Props = {
    appKey: string;
    subSystem: string;
};
export const CreateNewBookmark = ({ appKey, subSystem }: Props) => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const { saveBookmark } = bookmarkEvents;
    if (!isCreatingNew) {
        return (
            <CreateNewBookmarkWrapper>
                <div>Create new bookmark</div>
                <ClickableIcon
                    name="chevron_right"
                    onClick={(e) => {
                        setIsCreatingNew(true);
                        e.stopPropagation();
                    }}
                />
            </CreateNewBookmarkWrapper>
        );
    } else {
        return (
            <CreatingNewBookmarkWrapper>
                <TitleInput
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bookmark title"
                />
                <div>
                    <ClickableIcon
                        name="save"
                        onClick={(e) => {
                            saveBookmark({
                                title,
                                appKey,
                                subSystem,
                            });
                            setIsCreatingNew(false);
                            setTitle('');
                            e.stopPropagation();
                        }}
                    />
                    <ClickableIcon
                        name="close"
                        onClick={(e) => {
                            e.preventDefault();
                            setIsCreatingNew(false);
                            setTitle('');
                            e.stopPropagation();
                        }}
                    />
                </div>
            </CreatingNewBookmarkWrapper>
        );
    }
};
