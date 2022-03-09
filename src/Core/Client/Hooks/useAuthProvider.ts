import { AuthenticationProvider } from '@equinor/authentication';
import { useClientContext } from './useClientContext';

export function useAuthProvider(): AuthenticationProvider {
    const { internal } = useClientContext();
    return internal.authProvider;
}
