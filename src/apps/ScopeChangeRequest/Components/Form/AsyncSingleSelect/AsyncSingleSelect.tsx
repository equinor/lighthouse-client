import { SingleSelect, SingleSelectProps } from '@equinor/eds-core-react';

interface ExtraProps {
    isLoading?: boolean;
}

type AsyncSingleSelectProps = SingleSelectProps & ExtraProps;

export const AsyncSingleSelect = ({
    isLoading,
    ...singleSelectProps
}: AsyncSingleSelectProps): JSX.Element => {
    if (isLoading) {
        return (
            <SingleSelect
                disabled
                items={[]}
                placeholder="Loading.."
                label={singleSelectProps.label}
            />
        );
    }
    return <SingleSelect {...singleSelectProps} />;
};
