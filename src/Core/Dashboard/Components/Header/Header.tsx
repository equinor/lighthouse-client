import { PageConfig } from '../../Types/State';
import { ChipTab, TabTitle, Wrapper } from './HeaderStyles';

interface HeaderProps<T> {
    setActivePage: (pageId: string) => void;
    pages: Record<string, PageConfig<T>>;
}

export function Header<T>({ pages, setActivePage }: HeaderProps<T>): JSX.Element {
    return (
        <Wrapper>
            {Object.values(pages).map((page) => {
                return (
                    <ChipTab key={`pages-${page.title}`} onClick={() => setActivePage(page.pageId)}>
                        <TabTitle>{page.title}</TabTitle>
                    </ChipTab>
                );
            })}
        </Wrapper>
    );
}
