import { FunctionManifest } from '@equinor/lighthouse-functions';

export type CustomResolverFunction<T> = (id: string) => T | undefined | Promise<T | undefined>;

export interface ResolverFunction<T> extends FunctionManifest {
    type: 'idResolver';
    function: CustomResolverFunction<T>;
}
