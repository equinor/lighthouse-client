import { useEffect, useState } from 'react';
import { AuthenticationProvider } from './authService';

export function useAuthenticate(
    authProvider: AuthenticationProvider,
    logRequest?: (...args: unknown[]) => void
): boolean {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        if (authProvider && !authProvider.isAuthenticated()) {
            authProvider.handleLogin(logRequest).then(() => {
                setIsAuthenticated(authProvider.isAuthenticated());
            });
        } else {
            setIsAuthenticated(false);
        }
    }, [authProvider, logRequest]);

    return isAuthenticated;
}
