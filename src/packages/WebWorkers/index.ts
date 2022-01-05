import * as Comlink from 'comlink';
/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 *  This is the setup for worker Context. `ctx` for short
 *  there can only be one instance of the ctx.
 */
// export const ctx: Worker = self as any;

/**
 *   Code for Worker startup here!!
 *   Can be overwritten per worker instance
 */
function start(): void {
    // console.log('ctx start function');
}

const ctx: Comlink.Endpoint = self as any;
ctx.start = start;
export default ctx;
