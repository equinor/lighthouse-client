import { useHistory } from 'react-router';

function getDataViewerKey(pathname: string): string {
    const pathNames = pathname.split('/');

    if (pathNames[1]) {
        return pathNames[1];
    }

    return 'unknown';
}

export function useDataViewerKey(): string {
    const history = useHistory();
    return getDataViewerKey(history.location.pathname);
}
