import { AuthenticationProvider } from '@equinor/authentication';
import { User } from '@microsoft/microsoft-graph-types';
import { graphApiRequest, graphConfig } from './graphConfig';

export type GraphClient = ReturnType<typeof useGraphClient>;

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export function useGraphClient(authProvider: AuthenticationProvider) {
    /**
     * Graph method for fetching a users profile
     * Method authenticates user based on EchoAuthProvider user information
     * @returns User profile or undefined if user is not authenticated
     */
    async function graphGetProfile(): Promise<User | undefined> {
        const account = authProvider.getCurrentUser();
        if (!account) return;
        const requestConfig = graphApiRequest(account);

        const accessToken = await authProvider.getAccessToken(
            requestConfig.scopes
        );

        if (accessToken) {
            const userProfile = await getUserProfile(
                graphConfig.graphProfileEndpoint,
                accessToken
            );
            return userProfile;
        } else {
            return;
        }
    }

    /**
     * Graph method for fetching a users profile picture
     * Method authenticates user based on EchoAuthProvider user information
     * @returns User profile picture or undefined if user is not authenticated
     */
    async function graphGetProfilePicture(): Promise<string | undefined> {
        const account = authProvider.getCurrentUser();
        if (!account) return;
        const requestConfig = graphApiRequest(account);

        const accessToken = await authProvider.getAccessToken(
            requestConfig.scopes
        );
        if (accessToken) {
            const userProfilePictureUrl = await getUserProfilePicture(
                graphConfig.graphProfilePictureEndpoint,
                accessToken
            );
            return userProfilePictureUrl;
        } else {
            return;
        }
    }

    /**
     * Graph method that calls fetch user profile from graph api and handles response
     * @param endpoint graph endpoint to call, based on graph config values
     * @param token users access token used in graph fetch call
     * @returns User profile or undefined if response is not successful
     */
    async function getUserProfile(
        endpoint: string,
        token: string
    ): Promise<User | undefined> {
        let profile: User | undefined = undefined;
        const headers = new Headers();
        const bearer = `Bearer ${token}`;
        headers.append('Authorization', bearer);

        const options = {
            method: 'GET',
            headers: headers
        };

        if (false) {
            console.log(
                'request for user profile made to Graph API at: ' +
                    new Date().toString()
            );
        }

        const response: Response = await fetch(endpoint, options);
        if (response && response.ok) {
            profile = response.json() as User;
        }

        return profile;
    }

    /**
     * Graph method that calls profile picture endpoint on graph api and handles response
     * @param endpoint graph endpoint to call, based on graph config values
     * @param token users access token used in graph fetch call
     * @returns User profile picture or undefined if response is not successful
     */
    async function getUserProfilePicture(
        endpoint: string,
        token: string
    ): Promise<string | undefined> {
        let pictureUrl: string | undefined;
        const headers: Headers = new Headers();
        headers.append('Authorization', 'Bearer ' + token);
        headers.append('Content-Type', 'image/jpeg');

        const options = {
            method: 'GET',
            headers: headers
        };

        if (false) {
            console.log(
                'request for user profile picture made to Graph API at: ' +
                    new Date().toString()
            );
        }

        const response: Response = await fetch(endpoint, options);
        if (response && response.ok) {
            await response.blob().then((data) => {
                if (data !== null) {
                    window.URL = window.URL || window.webkitURL;
                    pictureUrl = window.URL.createObjectURL(data);
                }
            });
        }
        return pictureUrl;
    }

    return {
        getUserProfile,
        graphGetProfile,
        graphGetProfilePicture,
        getUserProfilePicture
    };
}
