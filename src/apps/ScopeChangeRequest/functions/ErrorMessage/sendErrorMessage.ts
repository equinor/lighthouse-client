import { ErrorMessageFormat } from './errorMessageFormat';
import { channelName } from './channelName';

/** Sends an error message to the error banner */
export function sendErrorMessage(message: ErrorMessageFormat): void {
    const bc = new BroadcastChannel(channelName);

    bc.postMessage(message);
}
