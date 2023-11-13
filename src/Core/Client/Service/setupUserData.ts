import { AuthenticationProvider } from '@equinor/authentication';
import { graphClient } from '@equinor/http-client';
import { setUser, setUserImageUrl } from '../Functions/Settings';

export async function setupUserData(authProvider: AuthenticationProvider): Promise<void> {
    const graph = graphClient(authProvider);
    setUserImageUrl(await graph.graphGetProfilePicture());
    const user = await graph.graphGetProfile();
    window['user'] = user;
    setUser(user);
}
