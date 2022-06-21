import { Intersection } from '@cognite/reveal';
/**
 * Should return an intersection from a point on the canvas.
 */
export type PixelIntersectionQuery = (canvasX: number, canvasY: number) => Promise<Intersection | null>;
