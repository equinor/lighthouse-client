import { Icon } from '@equinor/eds-core-react';
import { IconMenu } from '@equinor/overlay-menu';
import { useState } from 'react';
import { BookmarkResponse } from '../../types';
import { BookmarkLink } from './BookmarksSidesheet.styles';
import { DeleteModalContent } from './Modal/DeleteModalContent';
import { EditModalContent } from './Modal/EditModalContent';
import { Modal } from './Modal/Modal';
type Modals = 'Edit' | 'Delete';
type BookmarkEntryProps = {
    subSystem: string;
    appKey: string;
    bookmark: BookmarkResponse;
};
export const BookmarkEntry = ({ appKey, bookmark, subSystem }: BookmarkEntryProps) => {
    const [openedModal, setOpenedModal] = useState<Modals | null>(null);

    return (
        <>
            <BookmarkLink to={`/${subSystem}/${appKey}?bookmarkId=${bookmark.id}`}>
                {bookmark.name}
            </BookmarkLink>
            <IconMenu
                items={[
                    {
                        label: 'Edit',
                        icon: <Icon name="edit" />,
                        onClick: () => setOpenedModal('Edit'),
                    },
                    {
                        label: 'Delete',
                        icon: <Icon name="delete_forever" />,
                        onClick: () => setOpenedModal('Delete'),
                    },
                ]}
            />
            {openedModal === 'Edit' && (
                <Modal
                    title={'Edit bookmark'}
                    content={
                        <EditModalContent
                            bookmark={bookmark}
                            closeModal={() => setOpenedModal(null)}
                        />
                    }
                />
            )}
            {openedModal === 'Delete' && (
                <Modal
                    title={`Delete bookmark ${bookmark.name}`}
                    content={
                        <DeleteModalContent
                            bookmark={bookmark}
                            closeModal={() => setOpenedModal(null)}
                        />
                    }
                />
            )}
        </>
    );
};
