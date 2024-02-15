import { Icon } from '@equinor/eds-core-react-old';
import { Case, Switch } from '@equinor/JSX-Switch';
import { useCurrentUser } from '@equinor/lighthouse-portal-client';
import { IconMenu } from '@equinor/overlay-menu';
import { useState } from 'react';
import { patchBookmark, useBookmarkMutations } from '../..';
import { BookmarkResponse } from '../../types';
import {
    DeleteModalContent,
    EditModalContent,
    ShareModalContent,
    UnfavouriteModalContent,
    UnshareModalContent,
} from './Modal';
import { Modal } from '@equinor/modal';

export const createBookmarkURL = (bookmark: BookmarkResponse) => {
    /** JC handover shortname has a naming collision with the scaled versions appkey */
    /** Somebody should really refactor this at some point */
    if (bookmark.appKey == 'handover') {
        return `${window.location.origin}/ConstructionAndCommissioning/${bookmark.appKey}-new?bookmarkId=${bookmark.id}`;
    } else if (bookmark.appKey == 'mechanical-completion') {
        return `${window.location.origin}/ConstructionAndCommissioning/${bookmark.appKey}?bookmarkId=${bookmark.id}`;
    } else if (bookmark.appKey == 'jca-job-analytics') {
        return `${window.location.origin}/ConstructionAndCommissioning/${bookmark.appKey}?bookmarkId=${bookmark.id}`;
    } else {
        return `${window.location.origin}/${bookmark.sourceSystem.subSystem.replace(
            'jc-',
            ''
        )}/${bookmark.appKey.replace('jc-', '')}?bookmarkId=${bookmark.id}`;
    }
};

type Modals = 'Edit' | 'Delete' | 'Remove' | 'Share' | 'Unshare';
type MenuOptionsProps = {
    bookmark: BookmarkResponse;
};
export const MenuOptions = ({ bookmark }: MenuOptionsProps) => {
    const [openedModal, setOpenedModal] = useState<Modals | null>(null);
    const currentUser = useCurrentUser();
    const editBookmark = useBookmarkMutations(patchBookmark);
    const ownerOptions = [
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
        {
            label: bookmark.isShared ? 'Unshare' : 'Share',
            icon: <Icon name="share" />,
            onClick: () => {
                if (bookmark.isShared) {
                    setOpenedModal('Unshare');
                } else {
                    editBookmark({
                        isShared: true,
                        bookmarkId: bookmark.id,
                    });
                    setOpenedModal('Share');
                }
            },
        },
    ];
    const sharedOption = {
        label: 'Copy URL',
        icon: <Icon name="share" />,
        onClick: () => {
            navigator.clipboard.writeText(createBookmarkURL(bookmark));
        },
    };
    bookmark.isShared && ownerOptions.push(sharedOption);
    const nonOwnerOptions = [
        {
            label: 'Remove',
            icon: <Icon name="remove_outlined" />,
            onClick: () => setOpenedModal('Remove'),
        },
        sharedOption,
    ];
    return (
        <>
            <IconMenu
                items={
                    currentUser?.id === bookmark.createdBy.azureUniqueId
                        ? ownerOptions
                        : nonOwnerOptions
                }
                placement="bottom"
            />
            <Switch defaultCase={<></>}>
                <Case when={openedModal === 'Edit'}>
                    <Modal
                        title={'Edit bookmark'}
                        content={
                            <EditModalContent
                                bookmark={bookmark}
                                closeModal={() => setOpenedModal(null)}
                            />
                        }
                    />
                </Case>
                <Case when={openedModal === 'Delete'}>
                    <Modal
                        title={`Delete bookmark ${bookmark.name}`}
                        content={
                            <DeleteModalContent
                                bookmark={bookmark}
                                closeModal={() => setOpenedModal(null)}
                            />
                        }
                    />
                </Case>
                <Case when={openedModal === 'Share'}>
                    <Modal
                        title="Copied to clipboard"
                        content={
                            <ShareModalContent
                                bookmark={bookmark}
                                closeModal={() => setOpenedModal(null)}
                            />
                        }
                    />
                </Case>
                <Case when={openedModal === 'Remove'}>
                    <Modal
                        title={`Remove bookmark ${bookmark.name}`}
                        content={
                            <UnfavouriteModalContent
                                bookmark={bookmark}
                                closeModal={() => setOpenedModal(null)}
                            />
                        }
                    />
                </Case>
                <Case when={openedModal === 'Unshare'}>
                    <Modal
                        title={`Unshare bookmark: ${bookmark.name}`}
                        content={
                            <UnshareModalContent
                                bookmark={bookmark}
                                closeModal={() => setOpenedModal(null)}
                            />
                        }
                    />
                </Case>
            </Switch>
        </>
    );
};
