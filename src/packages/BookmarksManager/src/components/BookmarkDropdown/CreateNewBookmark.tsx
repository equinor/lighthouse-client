import { ClickableIcon } from '@equinor/lighthouse-components';
import { useState } from 'react';
import { bookmarkEvents } from '../../utils';
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
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <div>Create new bookmark</div>
                <ClickableIcon name="chevron_right" onClick={() => setIsCreatingNew(true)} />
            </div>
        );
    } else {
        return (
            <div
                style={{
                    display: 'flex',
                    alignContent: 'center',
                    justifyContent: 'center',
                }}
            >
                <input
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Bookmark title"
                    style={{ width: '150px' }}
                />
                <div>
                    <ClickableIcon
                        name="save"
                        onClick={() => {
                            saveBookmark({
                                title,
                                appKey,
                                subSystem,
                            });
                            setIsCreatingNew(false);
                            setTitle('');
                        }}
                    />
                    <ClickableIcon
                        name="close"
                        onClick={() => {
                            setIsCreatingNew(false);
                            setTitle('');
                        }}
                    />
                </div>
            </div>
        );
    }
};
