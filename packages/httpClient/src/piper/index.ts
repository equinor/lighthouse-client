// export function identity<T>(x: T): T {
//     return x;
// }

export interface Operator<T, R> {
    (source: T): R;
}

// // export function pipe(): typeof identity;
// export function pipe<T, A>(value: T, fn1: Operator<T, A>): Operator<T, A>;
// export function pipe<T, A, B>(
//     value: T,
//     fn1: Operator<T, A>,
//     fn2: Operator<A, B>
// ): Operator<T, B>;

// export function pipe<T, R>(
//     value: T,
//     ...fns: Operator<T, R>[]
// ): Operator<T, any> {
//     return pipeFromArray(fns, value);
// }

// export function pipeFromArray<T, R>(
//     fns: Array<Operator<T, R>>,
//     value: T
// ): Operator<T, R> {
//     if (fns.length === 1) {
//         return fns[0];
//     }

//     return function piped(input: T): R {
//         return fns.reduce(
//             (prev: any, fn: Operator<T, R>) => fn(prev),
//             value as any
//         );
//     };
// }

// interface Test {
//     test: string;
// }
// interface Test2 {
//     test: string;
//     test2: string;
// }

// const data = pipe({ test: 'test' }, (s) => s.test);

// // export function  mario(value: Response) => piper<T, A>(
// //     fn1: Operator<Response, T>,
// //     fn2: Operator<T, A>
// // ): Operator<T, A>;
// // export function  mario(value: Response) => piper<T, A, B>(
// //     fn1: Operator<Response, T>,
// //     fn2: Operator<T, A>,
// //     fn3: Operator<A, B>
// // ): Operator<A, B>;

// export function mario<T extends Response>(response: Response) {
//     return function piper<T, R>(...fns: Operator<T, R>[]): Operator<T, R> {
//         return pipeFromArray(fns, response);
//     };
// }

// export interface Piper {
//     pipe: typeof pipe;
// }

// // function piper(value: Response) {
// //     return {
// //         pipe:
// //             <R>(value: Response) =>
// //             <T> (...fns: Operator<T, R>[]) =>
// //                 pipe(value, ...fns)
// //     };
// // }
