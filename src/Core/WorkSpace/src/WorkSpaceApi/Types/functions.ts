import { FunctionManifest } from '@equinor/lighthouse-functions';

export type CustomResolverFunction<T> = (id: string) => T | undefined | Promise<T | undefined>;

export type Resolver = 'Resolver';

export type IdFormat = `${string}${Resolver}`;

export type ResolverIdFormat<T extends string = string> = `${T}Resolver`;

export interface ResolverFunction<T, ResolverId extends string> extends FunctionManifest {
    function: CustomResolverFunction<T>;
    functionId: ResolverIdFormat<ResolverId>;
}
