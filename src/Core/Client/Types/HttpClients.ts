import { Scope } from './ScopeAndUrls';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export type HttpClients = {
    [key in keyof Scope]: IHttpClient;
};
