import { Mutation } from 'react-query/types/core/mutation';
import { Query } from 'react-query/types/core/query';
import { ErrorMessageFormat } from '../../functions/ErrorMessage/errorMessageFormat';
import { sendErrorMessage } from '../../functions/ErrorMessage/sendErrorMessage';
import { useGlobalMutationListener } from './useGlobalMutationListener';
import { useGlobalQueryListener } from './useGlobalQueryListener';

/**
 * Octopus error handler watches over all react-query mutations and queries.
 * If a query or mutation fails it will catch it and send it over a broadcast channel to the nearest reciever
 */
export function useOctopusErrorHandler(): void {
    console.log('Octopus init');
    /**
     * Callback function to be called when a mutation fails
     * @param mutationEvent
     */
    function onMutationError(mutationEvent: Mutation<unknown, unknown, void, unknown>): void {
        console.log('On Mute Error');
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
        console.log('OnError Query');
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
    console.log('ParseError');
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
    console.log('Resolve err');
    if (isScopeChangeError(error)) {
        const scopeChangeError = error as ScopeChangeErrorFormat;
        return {
            title: scopeChangeError.title,
            description: scopeChangeError.detail,
        };
    }

    return {
        title: 'title' in error ? (error['title'] as string) : FALLBACK_ERROR_MESSAGE,
        description: 'description' in error ? (error['description'] as string) : '',
    };
}

// eslint-disable-next-line @typescript-eslint/ban-types
function isScopeChangeError(error: object): boolean {
    console.log('Is Scope error');
    return 'statusCode' in error && 'title' in error;
}

interface ScopeChangeErrorFormat {
    detail: string;
    statusCode: number;
    title: string;
    validationErrors: Record<string, string[]>;
    errors: Record<string, string[]>;
}
