import { useHistory } from 'react-router';

function getDataViewerKey(pathname: string) {
    const pathNames = pathname.split('/');
    if (pathNames[1]) {
        return pathNames[1];
    }
    return 'unknown';
}

export function useDataViewerKey() {
    const history = useHistory();
    return getDataViewerKey(history.location.pathname);
}
