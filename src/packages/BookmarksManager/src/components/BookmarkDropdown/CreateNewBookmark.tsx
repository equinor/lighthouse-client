import { ClickableIcon } from '@equinor/lighthouse-components';
import React, { useState } from 'react';
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

    const handleToCreateNew = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setIsCreatingNew(true);
        e.stopPropagation();
    };

    const handleSave = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        saveBookmark({
            title,
            appKey,
            subSystem,
        });
        setIsCreatingNew(false);
        setTitle('');
        e.stopPropagation();
    };

    const handleOnClose = (e: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
        setIsCreatingNew(false);
        setTitle('');
        e.stopPropagation();
    };
    if (!isCreatingNew) {
        return (
            <CreateNewBookmarkWrapper>
                <div>New saved bookmark</div>
                <ClickableIcon name="add" onClick={handleToCreateNew} />
            </CreateNewBookmarkWrapper>
        );
    }
    return (
        <CreatingNewBookmarkWrapper>
            <div>
                <TitleInput
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bookmark title"
                    autoFocus
                />
            </div>
            <CreatingNewIcons>
                <ClickableIcon name="save" onClick={handleSave} />
                <ClickableIcon name="close" onClick={handleOnClose} />
            </CreatingNewIcons>
        </CreatingNewBookmarkWrapper>
    );
};
