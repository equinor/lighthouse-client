/* eslint-disable jsdoc/no-undefined-types -- needed to make event trigger more general */
/*!
 * Copyright 2021 Cognite AS
 * Copied from cognite as its not exported from cognite npm package
 */

/**
 * Subscribable event source.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any -- needed to make event trigger more general
export class EventTrigger<TListener extends (...args: any[]) => void> {
    private readonly listeners: TListener[] = [];

    /**
     * Method for subscribing
     *
     * @param {TListener} listener the listener to subscribe
     */
    subscribe(listener: TListener): void {
        this.listeners.push(listener);
    }

    /**
     * Method for unsubscribe
     *
     * @param {TListener} listener the listener to unsubscribe
     */
    unsubscribe(listener: TListener): void {
        const index = this.listeners.indexOf(listener);
        if (index !== -1) {
            this.listeners.splice(index, 1);
        }
    }

    /**
     * Method for unsubscribing all listeners
     */
    unsubscribeAll(): void {
        this.listeners.splice(0);
    }

    /**
     * Method for firing an event to listeners
     *
     * @param {...any} args the args to forward to listeners
     */
    fire(...args: Parameters<TListener>): void {
        this.listeners.forEach((listener) => listener(...args));
    }
}
