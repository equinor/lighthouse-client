const CANCEL = Symbol();

class CancellationToken {
    cancelled: boolean;
    constructor() {
        this.cancelled = false;
    }

    throwIfCancelled() {
        if (this.isCancelled()) {
            throw 'Cancelled!';
        }
    }

    isCancelled() {
        return this.cancelled === true;
    }

    [CANCEL]() {
        this.cancelled = true;
    }

    // could probably do with a `register(func)` method too for cancellation callbacks
}

export default class CancellationTokenSource {
    token: CancellationToken;
    constructor() {
        this.token = new CancellationToken();
    }

    cancel(): void {
        this.token[CANCEL]();
    }
}
