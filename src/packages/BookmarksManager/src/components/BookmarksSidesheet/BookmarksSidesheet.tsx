import { Button, CircularProgress, Icon, TextField } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { ChangeEvent, useEffect, useState } from 'react';
import { SaveArgs, useBookmarks, useGetAllBookmarks } from '../..';
import { AppGroup } from './AppGroup';
import { Center, InfoText, SidesheetContent } from './BookmarksSidesheet.styles';
import { groupBookmarksBySubSystemAppkey } from './groupBookmarksBySubSystemAppKey';
import { apps } from '../../../../../apps/apps';
import { useFusionBookmarks } from '../../../../../hooks/useFusionBookmarks';
import { useMutation } from 'react-query';

type BookmarksSidesheetProps = {
    actions: SidesheetApi;
};

export const BookmarkSidesheet = ({ actions }: BookmarksSidesheetProps) => {
    const { bookmarks, isLoading, error, refetch } = useGetAllBookmarks();
    const [val, setVal] = useState('');

    const canCreateBookmark = isAppLoaded();

    useEffect(() => {
        actions.setTitle('Bookmarks');
    }, []);

    const { appGroups } = useRegistry();
    if (isLoading)
        return (
            <Center>
                <Icon
                    name="info_circle"
                    size={40}
                    color={tokens.colors.interactive.primary__resting.hsla}
                />
                <InfoText>No bookmarks</InfoText>
            </Center>
        );
    if (error) return <div>{error.message}</div>;
    if (!bookmarks || bookmarks.length === 0)
        return (
            <Center>
                <Icon name="info_circle" size={32} />
                <InfoText>No bookmarks</InfoText>
            </Center>
        );
    const bookmarksBySubsystemAppKey = groupBookmarksBySubSystemAppkey(bookmarks);

    return (
        <SidesheetContent>
            {canCreateBookmark && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2em' }}>
                    <TextField
                        label="BookmarkName"
                        onChange={(e: ChangeEvent) => setVal((e.target as any).value)}
                        value={val}
                        id="bookmarkName"
                    />
                    <CreateBookmarkButton refetch={refetch} appKey="handover" bookmarkName={val} />
                </div>
            )}
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <AppGroup
                        key={subSystemKey}
                        appGroupName={appGroups[subSystemKey]?.name ?? 'Fusion Project Portal'}
                        appGroupBookmarks={bookmarksBySubsystemAppKey[subSystemKey]}
                    />
                );
            })}
        </SidesheetContent>
    );
};

function CreateBookmarkButton({
    appKey,
    bookmarkName,
    refetch,
}: {
    appKey: string;
    bookmarkName: string;
    refetch: VoidFunction;
}) {
    const module = useFusionBookmarks();

    const { isLoading: isFusionBookmarksLoading, mutateAsync } = useMutation({
        mutationFn: async () => {
            console.log('Creating bookmark');
            await module.createBookmark({
                name: bookmarkName,
                isShared: false,
                description: '',
            });
            refetch();
        },
    });

    const { handleSaveBookmarks } = useBookmarks();

    const { isLoading: isOgLoading, mutateAsync: mutateOldAsync } = useMutation<
        void,
        unknown,
        SaveArgs<unknown>
    >({
        mutationFn: async (props) => {
            return handleSaveBookmarks(props);
        },
    });

    const isLoading = isFusionBookmarksLoading || isOgLoading;

    if (['handover'].includes(appKey)) {
        return (
            <Button style={{ width: '40%' }} onClick={() => mutateAsync()}>
                {isLoading ? <CircularProgress /> : 'Create bookmark'}
            </Button>
        );
    }

    return (
        <Button
            onClick={() => {
                console.warn('not implemented');
            }}
        >
            {isLoading ? <CircularProgress /> : 'Create bookmark'}
        </Button>
    );
}

function isAppLoaded() {
    const path = new URL(location.href).href.split('/').at(4)?.split('?')[0];
    const appRoutes = apps.map((s) => s.shortName);
    return appRoutes.includes(path ?? '');
}
