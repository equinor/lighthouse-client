import { PropsWithChildren, useCallback, useLayoutEffect, useRef } from 'react';
import { updateTypePredicateNodeWithModifier } from 'typescript';

type ItemMeasurerProps = {
    measure: any;
    tagName: any;
    [x: string]: any;
};
export const ItemMeasurer = (props: PropsWithChildren<ItemMeasurerProps>) => {
    const { children, measure, tagName, ...restProps } = props;

    const roRef = useRef<ResizeObserver | null>(null);
    const elRef = useRef(null);
    const measureRef = useRef(measure);
    measureRef.current = measure;

    const refSetter = useCallback((el) => {
        const ro = roRef.current;

        if (ro !== null && elRef.current !== null) {
            ro.unobserve(elRef.current);
        }
        elRef.current = el;

        if (ro !== null && elRef.current !== null) {
            ro.observe(elRef.current);
        }
    }, []);

    useLayoutEffect(() => {
        const update = () => {
            measureRef.current(elRef.current);
        };
        update();
        const ro = roRef.current ? roRef.current : new ResizeObserver(update);
        const el = elRef.current;
        if (el !== null) {
            ro.observe(el);
        }
        roRef.current = ro;

        return () => {
            ro.disconnect();
        };
    }, []);

    const Tag = tagName;

    return (
        <Tag ref={refSetter} {...restProps}>
            {children}
        </Tag>
    );
};
