import { useLocation } from 'react-router';

function getDataViewerKey(pathname: string): string {
    const pathNames = pathname.split('/');

    if (pathNames[2]) {
        return pathNames[2];
    }

    return 'unknown';
}

export function useDataViewerKey(): string {
    const location = useLocation();
    return getDataViewerKey(location.pathname);
}
