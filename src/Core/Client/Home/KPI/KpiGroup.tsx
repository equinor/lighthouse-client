import { Typography } from '@equinor/eds-core-react';
import { Header, KpiWrapper, Link, Wrapper } from './KpiGroupStyles';
import { KpiProgress, KpiProgressItem, KpiStatus, KpiStatusItem } from './KpiItem';

interface KpiItemProps {
    title: string;
    linkText: string;
    link?: string;
    kpiItems?: KpiProgressItem[] | KpiStatusItem[];
}

export const KpiGroup = ({ title, linkText, kpiItems, link }: KpiItemProps): JSX.Element => {
    return (
        <Wrapper>
            <Header>
                <Typography variant="h5">{title}</Typography>
                <Link to={link || '#'}>
                    <Typography>{linkText}</Typography>
                </Link>
            </Header>
            <KpiWrapper>
                {kpiItems?.map((item: KpiProgressItem | KpiStatusItem) => {
                    if (item.type === 'ProgressItem') {
                        return <KpiProgress {...item} />;
                    } else {
                        return <KpiStatus {...item} />;
                    }
                })}
            </KpiWrapper>
        </Wrapper>
    );
};
