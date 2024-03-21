import { HttpClients } from '../Types/HttpClients';
import { readClients } from './Readers';

export interface HttpClientOptions {
  scope: string;
  baseUrl?: string;
}

/**
 * Return configured httpClients according to what appConfig.urls provides.
 * the httpClients are pre scooped with the associated scope.
 *
 * ```
 * const {scopeChange} = httpClient();
 * ```
 * This wil provide a http client predefined with the current
 * environments scope and url for scopeChange
 *
 * By providing options under development one can create customHttpClient.
 * when committing to dev one should register the scope and url in the infra repo.
 *
 * @param {HttpClientOptions} [options]
 * @return {*}  {HttpClients}
 */
export function httpClient(): HttpClients {
  const clients = readClients();

  return clients;
}
