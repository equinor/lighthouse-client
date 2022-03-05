import { useLocation } from 'react-router-dom';

function getWorkspaceKey(pathname: string): string {
    const pathNames = pathname.split('/');

    if (pathNames[2]) {
        return pathNames[2];
    }

    return 'unknown';
}

export function useLocationKey(): string {
    const location = useLocation();
    return getWorkspaceKey(location.pathname);
}
