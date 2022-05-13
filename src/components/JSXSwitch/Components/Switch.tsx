import React from 'react';

interface SwitchProps {
    value: string | number | symbol | undefined | null | boolean;
    children: React.ReactNode;
    defaultCase?: React.ReactChild;
}

export function Switch({ value, children, defaultCase = <></> }: SwitchProps): JSX.Element {
    const child = React.Children.toArray(children).find(
        (child) => React.isValidElement(child) && child.props === value
    );

    return <>{child || defaultCase}</>;
}
