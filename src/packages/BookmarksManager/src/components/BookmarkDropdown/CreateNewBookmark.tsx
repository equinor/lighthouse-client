import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import { bookmarkEvents } from '../../utils';
import {
    CreateNewBookmarkWrapper,
    CreatingNewBookmarkWrapper,
    CreatingNewIcons,
    TitleInput,
} from './BookmarkDropdown.styles';

type CreateNewBookmarkProps = {
    appKey: string;
    subSystem: string;
};
export const CreateNewBookmark = ({ appKey, subSystem }: CreateNewBookmarkProps): JSX.Element => {
    const [isCreatingNew, setIsCreatingNew] = useState<boolean>(false);
    const [title, setTitle] = useState<string>('');
    const { saveBookmark } = bookmarkEvents;
    if (!isCreatingNew) {
        return (
            <CreateNewBookmarkWrapper>
                <div>New saved bookmark</div>
                <ClickableIcon
                    name="add"
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
                <div>
                    <TitleInput
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Bookmark title"
                    />
                </div>
                <CreatingNewIcons>
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
                            setIsCreatingNew(false);
                            setTitle('');
                            e.stopPropagation();
                        }}
                    />
                </CreatingNewIcons>
            </CreatingNewBookmarkWrapper>
        );
    }
};
