const UNRECOVERABLE_ERROR_CODES: number[] = [
    300, 301, 302, 303, 305, 308, 405, 406, 407, 409, 410, 411, 412, 415, 416, 429, 501, 502, 504,
    505, 506,
];
const AUTH_ERROR_CODES: number[] = [401, 403];

const RECOVERABLE_ERROR_CODES: number[] = [400, 500];

export async function throwOnError(res: Response, fallbackMessage?: string): Promise<void> {
    if (!res.ok) {
        switch (true) {
            case UNRECOVERABLE_ERROR_CODES.includes(res.status): {
                throw 'An unrecoverable error has occured';
            }

            case AUTH_ERROR_CODES.includes(res.status): {
                if (res.body !== null) {
                    throw (await res.json()) ?? fallbackMessage;
                } else {
                    throw 'User has no access';
                }
            }

            case RECOVERABLE_ERROR_CODES.includes(res.status): {
                if (res.body !== null) {
                    throw (await res.json()) ?? fallbackMessage;
                } else {
                    throw 'User has no access';
                }
            }

            default: {
                throw fallbackMessage ?? 'Something went wrong';
            }
        }
    }
}
