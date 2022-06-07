import { Button, Dialog, Icon, Input, Menu, Scrim, TextField } from '@equinor/eds-core-react';
import React, { Component, useCallback, useState } from 'react';
import styled from 'styled-components';
import { useEditBookmark } from '../..';
import { IconMenu } from '../../../../../components/OverlayMenu/src';
import { useRegistry } from '../../../../../Core/Client/Hooks';
import { spawnConfirmationDialog } from '../../../../../Core/ConfirmationDialog/Functions/spawnConfirmationDialog';
import { useDeleteBookmark } from '../../hooks/useDeleteBookmark';
import { BookmarkResponse } from '../../types';
import {
    Header,
    AppBookmarksContainer,
    Bookmarks,
    BookmarkLink,
    BookmarkLinkWrapper,
} from './BookmarksSidesheet.styles';

type AppBookmarkProps = {
    appKey: string;
    appBookmarks: BookmarkResponse[];
};
export const AppBookmarks = ({ appBookmarks, appKey }: AppBookmarkProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const { apps } = useRegistry();
    const t = apps.find((app) => app.shortName === appKey.replace('jc-', ''));

    return (
        <AppBookmarksContainer>
            <Header>
                <div>
                    <Icon
                        name={isOpen ? 'chevron_down' : 'chevron_right'}
                        onClick={() => setIsOpen((s) => !s)}
                    />
                </div>
                <h4>{t?.title ? t.title : appKey.replace('jc-', '')}</h4>
            </Header>
            {isOpen && (
                <Bookmarks>
                    {appBookmarks.map((bookmark) => {
                        const appKey = bookmark.appKey
                            .replace('jc-', '')
                            .replaceAll(' ', '-')
                            .toLocaleLowerCase();
                        const subSystem = bookmark.sourceSystem.subSystem.replace(' ', '');
                        return (
                            <BookmarkLinkWrapper key={bookmark.id}>
                                <BookmarkEntry
                                    appKey={appKey}
                                    subSystem={subSystem}
                                    bookmark={bookmark}
                                />
                            </BookmarkLinkWrapper>
                        );
                    })}
                </Bookmarks>
            )}
        </AppBookmarksContainer>
    );
};
type BookmarkEntryProps = {
    subSystem: string;
    appKey: string;
    bookmark: BookmarkResponse;
};
const BookmarkEntry = ({ appKey, bookmark, subSystem }: BookmarkEntryProps) => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    return (
        <>
            <BookmarkLink to={`/${subSystem}/${appKey}?bookmarkId=${bookmark.id}`}>
                {bookmark.name}
            </BookmarkLink>
            <div onClick={() => setIsModalOpen(true)}>Click</div>
            {isModalOpen && <Modal title={'title'} content={<>Test</>} />}
        </>
    );
};

type BookmarkMenuProps = {
    bookmark: BookmarkResponse;
};
const BookmarkMenu = ({ bookmark }: BookmarkMenuProps) => {
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');

    const onTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const onDescriptionChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
    }, []);
    const deleteBookmark = useDeleteBookmark('my-bookmarks');
    const editBookmark = useEditBookmark();
    return (
        <IconMenu
            items={[
                {
                    label: 'Delete',
                    icon: <Icon name="delete_forever" />,
                    onClick: () => deleteBookmark(bookmark.id),
                },
                {
                    label: 'Edit',
                    icon: <Icon name="edit" />,
                    onClick: () =>
                        spawnConfirmationDialog(
                            'Test',
                            'Title',
                            () =>
                                editBookmark({
                                    bookmarkId: bookmark.id,
                                    name: title || bookmark.name,
                                    description: description,
                                }),
                            <EditBookmark
                                originalBookmarkTitle={bookmark.name}
                                originalBookmarkDescription={bookmark?.description}
                                newDescription={description}
                                newTitle={title}
                                onDescriptionChange={onDescriptionChange}
                                onTitleChange={onTitleChange}
                            />
                        ),
                },
            ]}
        ></IconMenu>
    );
};

type EditBookmarkProps = {
    originalBookmarkTitle: string;
    originalBookmarkDescription: string | undefined;
    onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    onDescriptionChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    newTitle: string;
    newDescription: string;
};
const EditBookmark = ({
    originalBookmarkTitle,
    originalBookmarkDescription,
    onDescriptionChange,
    onTitleChange,
    newTitle,
    newDescription,
}: EditBookmarkProps) => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2em' }}>
            <TextField
                variant="default"
                id="title"
                label="Title"
                placeholder={originalBookmarkTitle}
                value={newTitle}
                onChange={onTitleChange}
            />
            <TextField
                variant="default"
                id="description"
                label="Description"
                value={newDescription}
                onChange={onDescriptionChange}
            />
        </div>
    );
};
const DialogContainer = styled(Dialog)`
    width: 100%;
    padding: 0.8rem 0.8rem;
    min-width: 350px;
`;

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    padding: 0.5em;
    align-items: center;
`;

const HorizontalDivider = styled.div`
    padding-left: 1.5em;
`;

const DialogPadding = styled.div`
    padding-left: 1em;
    padding-right: 1em;
`;

const TitleSection = styled.h2`
    width: 100%;
`;
type ModalProps = {
    title: string;
    content: React.ReactNode;
};
const Modal = ({ title, content }: ModalProps) => {
    return (
        <Scrim isDismissable={false} style={{ zIndex: 1000 }}>
            <DialogContainer>
                <DialogPadding>
                    <TitleSection>{title}</TitleSection>
                    {content}
                </DialogPadding>
            </DialogContainer>
        </Scrim>
    );
};
