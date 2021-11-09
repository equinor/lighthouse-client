import { useHistory } from 'react-router';

function getLocationKeyKey(pathname: string) {
    const pathNames = pathname.split('/');
    if (pathNames[1]) {
        return pathNames[1];
    }
    return 'unknown';
}

export function useLocationKey() {
    const history = useHistory();
    return getLocationKeyKey(history.location.pathname);
}
