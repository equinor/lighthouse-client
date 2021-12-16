import { useLocation } from 'react-router';

function getWorkSpaceKey(pathname: string): string {
    const pathNames = pathname.split('/');

    if (pathNames[2]) {
        return pathNames[2];
    }

    return 'unknown';
}

export function useWorkSpaceKey(): string {
    const location = useLocation();
    return getWorkSpaceKey(location.pathname);
}
