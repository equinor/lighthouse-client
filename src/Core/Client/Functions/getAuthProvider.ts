import { AuthenticationProvider } from '@equinor/authentication';
import { readInternalState } from './Readers';

export function getAuthProvider(): AuthenticationProvider {
    const { authProvider } = readInternalState();
    return authProvider;
}
