import { Icon } from '@equinor/eds-core-react';
import { tokens } from '@equinor/eds-tokens';
import { AppGroupe, AppGroups, AppManifest } from '@equinor/portal-client';
import { Header } from '../Header/Header';
import { Link, Links, Main, Section, SubTitle, Wrapper } from './GroupViewStyles';

interface GroupViewProps {
    group: AppGroupe;
    links?: AppManifest[];
    groups?: AppGroups;
    groupeId: string;
}

export function GroupView({ group, groups, links, groupeId }: GroupViewProps): JSX.Element {
    return (
        <Wrapper>
            <Header name={group.name} />
            <Section>
                <Main>
                    <SubTitle variant="h6">Welcome to Johan Castberg</SubTitle>
                    <iframe
                        name="embed-feed"
                        title="Yammer"
                        src="https://web.yammer.com/embed/groups/eyJfdHlwZSI6Ikdyb3VwIiwiaWQiOiIxMDA2NTk2NiJ9?header=false&footer=false&theme=light&background=white"
                        style={{
                            border: '0px',
                            overflow: 'hidden',
                            width: '100%',
                            minHeight: '600px',
                        }}
                    ></iframe>
                </Main>
                {groups && (
                    <Links>
                        <SubTitle variant="h6">App Group Links</SubTitle>
                        {Object.keys(groups).map((key) => {
                            const groupItem = groups[key];
                            if (groupItem.name === 'Top') return;
                            const CustomIcon = groupItem.icon;
                            return (
                                <Link key={`group-link-${key}`} to={`/${key}`}>
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}
                                    {<span>{groupItem.name}</span>}
                                </Link>
                            );
                        })}
                    </Links>
                )}
                {links && (
                    <Links>
                        <SubTitle variant="h6">App Links</SubTitle>
                        {links.map((item) => {
                            const CustomIcon = item.icon;
                            return (
                                <Link
                                    key={`group-link-${item.shortName}`}
                                    to={`/${groupeId}/${item.shortName}`}
                                >
                                    {CustomIcon && typeof CustomIcon !== 'string' && <CustomIcon />}

                                    {CustomIcon && typeof CustomIcon === 'string' && (
                                        <Icon
                                            name={CustomIcon}
                                            title={item.title}
                                            color={tokens.colors.text.static_icons__secondary.rgba}
                                        />
                                    )}

                                    {<span>{item.title}</span>}
                                </Link>
                            );
                        })}
                    </Links>
                )}
            </Section>
        </Wrapper>
    );
}
