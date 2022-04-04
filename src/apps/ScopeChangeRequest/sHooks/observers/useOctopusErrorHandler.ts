import { Mutation } from 'react-query/types/core/mutation';
import { Query } from 'react-query/types/core/query';
import { ErrorMessageFormat } from '../../sFunctions/ErrorMessage/errorMessageFormat';
import { sendErrorMessage } from '../../sFunctions/ErrorMessage/sendErrorMessage';
import { useGlobalMutationListener } from './useGlobalMutationListener';
import { useGlobalQueryListener } from './useGlobalQueryListener';

/**
 * Octopus error handler watches over all react-query mutations and queries.
 * If a query or mutation fails it will catch it and send it over a broadcast channel to the nearest reciever
 */
export function useOctopusErrorHandler(): void {
    /**
     * Callback function to be called when a mutation fails
     * @param mutationEvent
     */
    function onMutationError(mutationEvent: Mutation<unknown, unknown, void, unknown>): void {
        const errorMessage = parseError(mutationEvent.state.error);
        const error: ErrorMessageFormat = {
            title: errorMessage.title ?? 'Something went wrong',
            description: errorMessage.description,
            queryKey: (mutationEvent.options.mutationKey as string[]) ?? [],
            type: 'Mutation',
        };

        sendErrorMessage(error);
    }

    /**
     * Callback function to be called when a query fails
     * @param query
     */
    function onQueryError(query: Query<any, any, any, any>): void {
        const errorMessage = parseError(query.state.error);
        const error: ErrorMessageFormat = {
            title: errorMessage.title ?? 'Something went wrong',
            description: errorMessage.description,
            queryKey: query.queryKey,
            type: 'Query',
        };
        sendErrorMessage(error);
    }

    useGlobalQueryListener({ onQueryError: onQueryError });
    useGlobalMutationListener({ onMutationError: onMutationError });
}

const FALLBACK_ERROR_MESSAGE = 'Something went wrong';

function parseError(error: unknown): Partial<ErrorMessageFormat> {
    const parsedError: Partial<ErrorMessageFormat> = {
        title: '',
        description: '',
    };

    switch (typeof error) {
        case 'string': {
            parsedError.title = error;
            break;
        }

        case 'object': {
            if (error === null) {
                parsedError.title = FALLBACK_ERROR_MESSAGE;
                parsedError.description = 'No errormessage provided';
                break;
            }
            const parsed = resolveErrorObject(error);
            parsedError.title = parsed.title;
            parsedError.description = parsed.description;
            break;
        }

        case 'undefined': {
            parsedError.title = FALLBACK_ERROR_MESSAGE;
            parsedError.description = 'Undefined error message';
            break;
        }

        default: {
            parsedError.title = FALLBACK_ERROR_MESSAGE;
            parsedError.description = 'Error has no type';
            break;
        }
    }

    return parsedError;
}

// eslint-disable-next-line @typescript-eslint/ban-types
function resolveErrorObject(error: object): Partial<ErrorMessageFormat> {
    if (isScopeChangeError(error)) {
        const scopeChangeError = error as ScopeChangeErrorFormat;
        return {
            title: scopeChangeError.title,
            description: scopeChangeError.detail,
        };
    }

    return {
        title: 'title' in error ? error['title'] : FALLBACK_ERROR_MESSAGE,
        description: 'description' in error ? error['description'] : 'unknown error',
    };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isScopeChangeError(error: object): boolean {
    const scopeChangeKeys: (keyof ScopeChangeErrorFormat)[] = [
        'detail',
        'statusCode',
        'title',
        'validationErrors',
    ];
    return Object.keys(error).every((key) =>
        scopeChangeKeys.includes(key as keyof ScopeChangeErrorFormat)
    );
}

interface ScopeChangeErrorFormat {
    detail: string;
    statusCode: number;
    title: string;
    validationErrors: null;
}
