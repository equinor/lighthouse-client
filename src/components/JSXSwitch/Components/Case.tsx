export interface CaseProps {
    value: string | number | symbol | undefined | null | boolean;
}
export const Case = ({ children }: React.PropsWithChildren<CaseProps>): JSX.Element => {
    return <>{children}</>;
};
