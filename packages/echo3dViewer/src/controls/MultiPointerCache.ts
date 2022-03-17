/**
 * MultiPointerCache class
 * Cache helper for MultiPointer tracking.
 * All actual pointer events need to be handled by the calling code,
 * this class does not listen to any events itself.
 */
export class MultiPointerCache {
    /**
     * Cache of "active" pointers. It does not self-update, and you must manually add, update and remove pointers.
     */
    private activePointers: Array<PointerEvent> = [];

    /**
     * Add the pointer to the Cache
     * Remember to update pointer in "pointermove" events as well.
     *
     * @param {PointerEvent} ev pointer event to cache
     */
    addOrUpdatePointer(ev: PointerEvent): void {
        let found = false;
        // Find this event in the cache and update its record with this event
        for (let i = 0; i < this.activePointers.length; i++) {
            if (ev.pointerId === this.activePointers[i].pointerId) {
                this.activePointers[i] = ev;
                found = true;
                break;
            }
        }
        if (!found) {
            this.activePointers.push(ev);
        }
    }

    /**
     * Method that removes an event from the cache (on pointerup or similar event)
     *
     * @param {PointerEvent} ev pointer event to remove
     */
    removePointer(ev: PointerEvent): void {
        // Remove this event from the target's cache
        for (let i = 0; i < this.activePointers.length; i++) {
            const cachedPointer = this.activePointers[i];
            if (
                cachedPointer.pointerId === ev.pointerId || // The removed pointer
                cachedPointer.timeStamp + 10 * 1000 < Date.now() // Or the pointer is obviously removed a long time ago
            ) {
                this.activePointers.splice(i, 1);
            }
        }
    }

    /**
     * Clear the list of known pointers
     */
    clearEventCache(): void {
        this.activePointers.length = 0;
    }

    /**
     * Get the current number of active pointers (Touch/click points)
     *
     * @returns {number} the count of active pointers
     */
    activePointerCount(): number {
        return this.activePointers.length;
    }

    /**
     * Get a snapshot of all the last recorded pointer events.
     *
     * This is not a reference, so the list will not automatically update.
     *
     * @returns {Array<PointerEvent>} all active pointers at this moment
     */
    activePointersSnapshot = (): Array<PointerEvent> => [...this.activePointers];
}
