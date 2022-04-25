import React from 'react';
import { useState } from 'react';
import { Group } from './Group';
import { Item } from './Item';

interface SectionProps<T> {
    title: string;
    headerIcon?: JSX.Element;
    children: React.ReactElement<T>[];
}

export function Section<T>({ children, title, headerIcon }: SectionProps<T>): JSX.Element {
    const [isExpanded, setIsExpanded] = useState(false);
    const toggleExpanded = () => setIsExpanded((prev) => !prev);

    return (
        <>
            <Group
                headerIcon={headerIcon}
                isExpanded={isExpanded}
                onChevronClick={toggleExpanded}
                title={title}
            />

            {isExpanded &&
                children.map((child: React.ReactElement<T>, i) => <Item key={i}>{child}</Item>)}
        </>
    );
}
