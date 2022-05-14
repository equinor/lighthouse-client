export interface CaseProps {
    when: boolean | string | number | symbol | undefined | null;
}
export const Case = ({ children }: React.PropsWithChildren<CaseProps>): JSX.Element => {
    return <>{children}</>;
};
