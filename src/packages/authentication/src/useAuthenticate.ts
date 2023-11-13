import { useEffect } from 'react';
import { AuthenticationProvider } from './authService';

export function useAuthenticate(
    authProvider: AuthenticationProvider,
    logRequest?: (...args: unknown[]) => void
): boolean {
    const isAuth = authProvider.isAuthenticated();

    useEffect(() => {
        if (authProvider && !isAuth) {
            authProvider.handleLogin(logRequest);
        }
    }, [isAuth, authProvider, logRequest]);

    return authProvider.isAuthenticated();
}
