import { HttpClient } from '@equinor/http-client';
import { Scope } from './ScopeAndUrls';

export type HttpClients = {
    [key in keyof Scope]: HttpClient;
} & {
    customApi: HttpClient;
};
