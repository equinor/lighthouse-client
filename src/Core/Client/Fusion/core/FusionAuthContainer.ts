import { AuthenticationProvider } from '@equinor/authentication';
import { AuthApp, AuthContainer, AuthUser } from '@equinor/fusion';
import { AuthUserJSON } from '@equinor/fusion/lib/auth/AuthUser';

const global = window as any;

// from msal
type AccountInfo = {
    homeAccountId: string;
    environment: string;
    tenantId: string;
    username: string;
    localAccountId: string;
    name?: string;
};

/**
 * THIS IS ONLY TEMPORARY!!!
 * in future this should be deleted, when all apps are over on new framework!
 */
class FusionAuthUser {
    constructor(protected _info: AccountInfo) {}
    get id(): string {
        return this._info.localAccountId;
    }
    get fullName(): string {
        if (!this._info.name) {
            console.warn('[FusionAuthUser::fullName]: missing!');
            return '';
        }
        return this._info.name;
    }
    get givenName(): string {
        return this.fullName.split(' ').at(0) || '';
    }
    get familyName(): string {
        return this.fullName.split(' ').at(-1) || '';
    }
    get roles(): string[] {
        throw new Error('Method not implemented.');
    }
    get upn(): string {
        return this._info.username;
    }

    /** === DEPRECATED! === */
    mergeWithToken(): void {
        throw new Error('Method not implemented.');
    }
    toObject(): AuthUserJSON {
        throw new Error('Method not implemented.');
    }
    toString(): string {
        throw new Error('Method not implemented.');
    }
}
export default class FusionAuthContainer extends AuthContainer {
    private authProvider: AuthenticationProvider;
    constructor(authProvider: AuthenticationProvider) {
        super();
        this.authProvider = authProvider;
        console.log(this.apps);
    }

    /**
     * dunno if we kan handle single logout for a client id?
     * @deprecated
     */
    public async logoutAsync(clientId?: string) {
        console.trace(`FusionAuthContainer::logoutAsync for client id [${clientId}]`);
        // await super.logoutAsync(clientId);
        // window.location.href = "/sign-out";
    }

    async getCachedUserAsync() {
        return this.getCachedUser();
    }

    getCachedUser() {
        const account = this.authProvider.getCurrentUser();
        if (!account) {
            throw Error('no logged in user!');
        }
        return new FusionAuthUser(account) as unknown as AuthUser;
    }

    async acquireTokenAsync(resource: string): Promise<string | null> {
        const token = await this.authProvider.acquireAccessToken({
            scopes: ['97978493-9777-4d48-b38a-67b0b9cd88d2/.default'],
        });
        if (!token) {
            throw Error('failed to aquire token');
        }
        return token;
    }

    /** internal registry of 'new' apps registred for msal */
    protected _registeredApps: Record<string, AuthApp> = {};
    async registerAppAsync(clientId, resources, legacy = true) {
        if (legacy) {
            console.warn(`registering legacy client for [${clientId}]`);
            return super.registerAppAsync(clientId, resources);
        }
        resources = resources.filter(Boolean);
        const app = this.resolveApp(clientId) ?? new AuthApp(clientId, resources);
        app.updateResources(resources);
        this._registeredApps[clientId] = app;
        this.apps.push(app);
        return true;
    }

    /**
     * @deprecated
     */
    protected async refreshTokenAsync(resource: string) {
        console.trace(`FusionAuthContainer::refreshTokenAsync legacy for resource [${resource}]`);
        const app = this.resolveApp(resource);

        if (app && app.clientId === global.clientId) {
            const refreshUrl = `/auth/refresh`;
            try {
                const response = await fetch(refreshUrl, {
                    credentials: 'include',
                    method: 'POST',
                });

                if (response.status === 200) {
                    return response.text();
                }
            } catch (err) {
                // @todo AI
                console.error(err);
            }
        }

        return super.refreshTokenAsync(resource);
    }
}
