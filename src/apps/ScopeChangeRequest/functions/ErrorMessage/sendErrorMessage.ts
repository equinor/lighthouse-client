import { ErrorMessageFormat } from './errorMessageFormat';
import { channelName } from './channelName';

/** Sends an error message to the error banner */
export function sendErrorMessage(message: ErrorMessageFormat): void {
    console.log('Octopus grabbed');
    const bc = new BroadcastChannel(channelName);
    bc.postMessage(message);
}
