const SERVER_ERROR = 'Server error encountered an error and could not respond with data.';
const AUTH_ERROR =
    'It looks like you do not have access to enter this page, please apply for access and try again.';

export function checkResponseCode(response: Response): Response {
    if (response.status.toString()[0] === '4') {
        if (response.status === 404) {
            throw SERVER_ERROR;
        }
        throw AUTH_ERROR;
    }

    if (!response.ok) {
        throw SERVER_ERROR;
    }

    return response;
}
