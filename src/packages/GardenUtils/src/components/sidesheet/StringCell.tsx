/**
 * Component to remove leading and trailing white space of a string.
 * If the string is falsy, component will return 'N/A'
 */
export const StringCell = ({ value }: { value: string | null }) => (
    <>{value ? value.trim() : 'N/A'}</>
);
