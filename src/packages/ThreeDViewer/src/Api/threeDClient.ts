import { CogniteClient } from '@cognite/sdk';

type OAuthLoginResult = [() => Promise<boolean>, string | null];
export type GetToken = () => Promise<string>;
export type Login = (getToken: GetToken) => Promise<boolean>;

export interface ThreeDClientInstance {
    client: CogniteClient;
    login: Login;
}

export async function threeDClient(
    baseUrl?: string,
    project?: string
): Promise<ThreeDClientInstance> {
    const client = new CogniteClient({
        appId: '',
        baseUrl
    });

    client.setProject(project ? project : '3d-web');

    async function login(getToken: GetToken): Promise<boolean> {
        const customLogin = async (callbacks: {
            setCluster: (clusterId: string) => void;
            setBearerToken: (bearerToken: string) => void;
            validateAccessToken: (bearerToken: string) => Promise<boolean>;
        }): Promise<OAuthLoginResult> => {
            const authenticate = async (): Promise<boolean> => {
                try {
                    const tokenRetry = await getToken();

                    if (!tokenRetry) {
                        throw new Error(
                            'Failed to authenticate CogniteClient.'
                        );
                    }

                    callbacks.setBearerToken(tokenRetry);
                    return true;
                } catch (error) {
                    return false;
                }
            };

            const token = await getToken();

            return [authenticate, token];
        };

        return await client.loginWithCustom(customLogin);
    }

    return { client, login };
}
