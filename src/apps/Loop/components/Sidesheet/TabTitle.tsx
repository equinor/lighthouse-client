import { Progress } from '@equinor/eds-core-react';

type LoadingTabTitleProps<T> = {
    isLoading: boolean;
    data: T[] | undefined;
};
export const TabTitle = <T extends Record<string, unknown>>({
    data,
    isLoading,
}: LoadingTabTitleProps<T>): JSX.Element => {
    if (isLoading) {
        return <Progress.Dots color="primary" />;
    }
    if (!data) {
        return <>(0)</>;
    }
    return <>({data.length})</>;
};
