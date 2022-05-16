export interface FunctionManifest {
    functionId: string;
    function: CustomFunction;
    type: string;
}

export type CustomFunction = (prop: any) => any;
export type CustomResolverFunction<T> = (id: string) => T | undefined | Promise<T | undefined>;

export interface ResolverFunction<T> extends FunctionManifest {
    type: 'idResolver';
    function: CustomResolverFunction<T>;
}
