import { BaseError } from './baseError';
import { IHttpClient } from '@equinor/fusion-framework-module-http';

export class AuthenticationError extends BaseError {}

export type HttpClient = IHttpClient;
