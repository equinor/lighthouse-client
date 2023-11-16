import { Button, CircularProgress, Icon, TextField, Typography } from '@equinor/eds-core-react';
import { useRegistry } from '@equinor/lighthouse-portal-client';
import { SidesheetApi } from '@equinor/sidesheet';
import { ChangeEvent, useEffect, useState } from 'react';
import { SaveEventArgs, bookmarkEvents, useGetAllBookmarks } from '../..';
import { AppGroup } from './AppGroup';
import { Center, InfoText, SidesheetContent } from './BookmarksSidesheet.styles';
import { groupBookmarksBySubSystemAppkey } from './groupBookmarksBySubSystemAppKey';
import { apps, getApps } from '../../../../../apps/apps';
import { useFusionBookmarks } from '../../../../../hooks/useFusionBookmarks';
import { useMutation } from 'react-query';

type BookmarksSidesheetProps = {
    actions: SidesheetApi;
};

export const BookmarkSidesheet = ({ actions }: BookmarksSidesheetProps) => {
    const { bookmarks, isLoading, error, refetch } = useGetAllBookmarks();
    const [val, setVal] = useState('');

    const appKey = tryGetCurrentAppKey();

    useEffect(() => {
        actions.setTitle('Bookmarks');
    }, []);

    const { appGroups } = useRegistry();

    if (isLoading) {
        return (
            <Center>
                <CircularProgress size={48} />
                <Typography variant="h2">Loading bookmarks</Typography>
            </Center>
        );
    }

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
            {!!appKey && (
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2em' }}>
                    <TextField
                        label="Bookmark name"
                        onChange={(e: ChangeEvent) => setVal((e.target as any).value)}
                        value={val}
                        id="bookmarkName"
                    />
                    <CreateBookmarkButton
                        refetch={refetch}
                        appKey={appKey}
                        bookmarkName={val}
                        resetName={() => setVal('')}
                    />
                </div>
            )}
            {Object.keys(bookmarksBySubsystemAppKey).map((subSystemKey) => {
                return (
                    <AppGroup
                        isOld={appGroups[subSystemKey] !== undefined}
                        key={subSystemKey}
                        appGroupName={
                            appGroups[subSystemKey]?.name ?? 'Construction and Commissioning new'
                        }
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
    resetName,
}: {
    resetName: VoidFunction;
    appKey: string;
    bookmarkName: string;
    refetch: VoidFunction;
}) {
    const module = useFusionBookmarks();

    const { isLoading: isFusionBookmarksLoading, mutateAsync } = useMutation({
        mutationFn: async () => {
            await module.createBookmark({
                name: bookmarkName,
                isShared: true,
                description: '',
            });
            refetch();
            resetName();
        },
    });

    const { isLoading: isOgLoading, mutateAsync: mutateOldAsync } = useMutation<
        void,
        unknown,
        SaveEventArgs
    >({
        mutationFn: async (props) => {
            resetName();
            return bookmarkEvents.saveBookmark(props);
        },
    });

    const isLoading = isFusionBookmarksLoading || isOgLoading;

    if (
        apps
            .filter((s) => s.app?.appType === 'FusionApp')
            .map((s) => s.shortName)
            .includes(appKey)
    ) {
        return (
            <Button style={{ width: '40%' }} onClick={() => mutateAsync()}>
                {isLoading ? <CircularProgress /> : 'Create bookmark'}
            </Button>
        );
    }

    return (
        <Button
            onClick={() => {
                const subSystem = getSubSystemFromUrl();
                if (!subSystem) return;
                mutateOldAsync({
                    appKey: appKey,
                    subSystem: subSystem,
                    title: bookmarkName,
                });
            }}
        >
            {isLoading ? <CircularProgress /> : 'Create bookmark'}
        </Button>
    );
}

function getSubSystemFromUrl() {
    return new URL(location.href).href.split('/').at(3);
}

function tryGetCurrentAppKey() {
    const path = new URL(location.href).href.split('/').at(4)?.split('?')[0];
    const appRoutes = getApps().map((s) => s.shortName);
    return appRoutes.find((x) => x === path ?? '');
}
