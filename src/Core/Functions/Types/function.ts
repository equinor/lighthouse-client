export interface FunctionManifest {
    functionId: string;
    function: CustomFunction;
    type: string;
}

export type CustomFunction = (prop: any) => any;
